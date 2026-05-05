import prisma from '../config/prisma.client.js';
import * as accountRepo from '../repo/accountsRepo.js';
import * as transactionRepo from '../repo/transactionsRepo.js';
import * as ledgerService from './ledgerServices.js';
import * as nameEnquiryService from '../nibbs/nibbs.nameEnquiry.js';
import * as nibbsTransferServices from '../nibbs/transferServices.js';
import { text } from 'express';

import crypto from "crypto";

export const transferFunds = async (
  senderAccountId,
  receiverAccountNumber,
  bankcode,
  amount,
  narration
) => {
  // 1. Validate sender
  const sender = await accountRepo.findAccountById(senderAccountId);

  if (!sender) throw new Error("Sender account not found");

  if (Number(sender.balance) < Number(amount)) {
    throw new Error("Insufficient funds");
  }

  // 2. Name enquiry
  const enquiry = await nameEnquiryService.resolveAccountName(
    receiverAccountNumber,
    bankcode
  );

  const reference = crypto.randomUUID();

  // 3. Create transaction (PENDING)
  const transaction = await transactionRepo.createTransaction({
    reference,
    senderAccountId,
    receiverAccountNumber,
    receiverAccountName: enquiry.accountName,
    bankcode,
    amount,
    transactionType: "INTER",
    direction: "DEBIT",
    status: "PENDING",
    narration,
  });

  // 4. CALL NIBSS FIRST (VERY IMPORTANT)
  let externalTransfer;
  try {
    externalTransfer = await nibbsTransferServices.initiateTransfer(
      sender.accountNumber,
      receiverAccountNumber,
      amount,
      narration,
      reference
    );
  } catch (err) {
    await transactionRepo.updateTransactionStatus(
      transaction.id,
      "FAILED"
    );
    throw new Error("External transfer failed");
  }

  // 5. If success → update DB atomically
  await prisma.$transaction(async (tx) => {
    const newBalance = Number(sender.balance) - Number(amount);

    // debit sender
    await tx.account.update({
      where: { id: sender.id },
      data: { balance: newBalance },
    });

    // ledger entry
    await tx.ledgerEntry.create({
      data: {
        accountId: sender.id,
        transactionId: transaction.id,
        entryType: "DEBIT",
        amount,
        balanceAfter: newBalance,
        narration: `Transfer to ${enquiry.accountName} (${receiverAccountNumber})`,
      },
    });
  });

  // 6. mark success
  await transactionRepo.updateTransactionStatus(
    transaction.id,
    "SUCCESSFUL"
  );

  return {
    success: true,
    transactionReference: reference,
    message: "Transfer successful",
  };
};
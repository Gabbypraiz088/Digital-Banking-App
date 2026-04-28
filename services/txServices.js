import prisma from '../config/prisma.client.js';
import * as accountRepo from '../repo/accountsRepo.js';
import * as transactionRepo from '../repo/transactionsRepo.js';
import * as ledgerService from './ledgerServices.js';
import * as nameEnquiryService from '../nibbs/nibbs.nameEnquiry.js';
import * as nibbsTransferServices from '../nibbs/transferServices.js';
import { text } from 'express';

// transfer funds
export const transferFunds = async (
    senderAccountId,
    receiverAccountNumber,
    bankcode,
    amount,
    narration
) => {
// validate sender
    const sender = await accountRepo.findAccountById(senderAccountId)
};

    if(!sender){
        throw new Error('Sender account not found');
    }

// check account balance
    if(Number(sender.balance)< Number(amount)){
        throw new Error('Insufficient funds');
    }

// name enquiry for receiver
    const enquiry = await nameEnquiryService.resolveAccountName(
        receiverAccountNumber,
        bankcode
    )

// create transaction record
    const transaction = await transactionRepo.createTransaction({
        reference: crypto.randomUUID(),
        senderAccountId,
        receiverAccountNumber,
        receiverAccountName: enquiry.accountName,
        bankcode,
        amount,
        transactionType: 'INTER',
        direction: 'DEBIT',
        status: 'PENDING',
        narration
    })

// DB transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
        // debit sender
        const newBalance = Number(sender.balance) - Number(amount);
        await tx.account.update({
            where: {id: sender.id},
            balance: newBalance
        })
    });

    // create ledger entry 
    await tx.ledgerEntry.create({
        data: {
            accountId: sender.id,
            transactionId: transaction.id,
            entryType: 'DEBIT',
            amount,
            balanceAfter: newBalance,
            narration: `Transfer to ${enquiry.accountName} (${receiverAccountNumber})`
        },
    });

    // external transfer via NIBBS
    const externalTransfer = await nibbsTransferServices.initiateTransfer({
        amount,
        accountNumber: receiverAccountNumber,
        narration,
        bankcode,
        reference: transaction.reference
    });

    // update transfer status
    await transactionRepo.updateTransactionStatus(
        transaction.id, 
        "successful");

    return {
        success: true,
        transactionReference: transaction.reference,
        message: 'Transfer successful'
    };
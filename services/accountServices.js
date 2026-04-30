import * as accountRepo from '../repo/accountsRepo.js';
import {generateAccountNumber} from '../nibbs/generateAccountNumber.js';
import {checkAccountBalance} from '../nibbs/balanceEnquiryServices.js';

// create a new account
export const createAccount =
  async (data) => {

    if (!data.accountName) {
      throw new Error(
        "Account name is required"
      );
    }

    // call NIBSS
    const generatedAccount =
      await generateAccountNumber({
        accountName:
          data.accountName,
      });

    if (!generatedAccount || !generatedAccount.accountNumber) {
      throw new Error(
        "Failed to generate account number"
      );
    }

    // save to DB
    return await accountRepo
      .createAccount({

        ...data,

        accountNumber: generatedAccount.accountNumber,
      });
};

// balance enquiry

export const getBalance =
  async (accountId) => {

    const account =
      await accountRepo.findAccountById(accountId);

    if (!account) {throw new Error(
        "Account not found"
      );
    } const balance =
      await checkAccountBalance({

        accountNumber:
          account.accountNumber,

        bankCode:
          account.bankCode,

      });

    return balance;
};

// get account details by id
export const getAccountById = async (id) => {
    const account = await accountRepo.findAccountById(id);
    if (!account) {
        throw new Error("Account not found");
    }
    return account;
};

// Credit account
export const creditAccount = async (accountId, amount) => {
  const account = await accountRepo.findAccountById(accountId);

  if (!account) throw new Error("Account not found");

  const newBalance = Number(account.balance) + Number(amount);

  return await accountRepo.updateAccountBalance(accountId, newBalance);
};

// Debit account
export const debitAccount = async (accountId, amount) => {
  const account = await accountRepo.findAccountById(accountId);

  if (!account) throw new Error("Account not found");
  if (account.balance < amount) throw new Error("Insufficient funds");

  const newBalance = Number(account.balance) - Number(amount);

  return await accountRepo.updateAccountBalance(accountId, newBalance);
};


import * as accountRepo from '../repo/accountsRepo';

// create a new account
export const createAccount = async (data) => {
    if (!data.accountNumber || !data.accountName || !data.bankName) {
        throw new Error("Missing required fields: accountNumber, accountName, bankName");
    }
    return accountRepo.createAccount(data);
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

  const newBalance = account.balance + amount;

  return await accountRepo.updateAccountBalance(accountId, newBalance);
};

// Debit account
export const debitAccount = async (accountId, amount) => {
  const account = await accountRepo.findAccountById(accountId);

  if (!account) throw new Error("Account not found");
  if (account.balance < amount) throw new Error("Insufficient funds");

  const newBalance = account.balance - amount;

  return await accountRepo.updateAccountBalance(accountId, newBalance);
};


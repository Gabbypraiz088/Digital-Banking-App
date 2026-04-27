import * as transactionRepo from '../repo/transactionsRepo';

//fetch transaction
export const getTransaction = async (reference) => {
    const transaction = await transactionRepo.getTrancationByReference(reference);

    if(!transaction) {
        throw new error('Transaction not found');
    }
    return transaction;
};

// fetch transaction for account
export const getTransactionForAccount = async (accountId) => {
    const transactions = await transactionRepo.getAccountTransaction(
        accountId
    );
};
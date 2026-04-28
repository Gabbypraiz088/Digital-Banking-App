import * as ledgerRepo from '../repo/ledgerRepo.js';

// record debit entry
export const recordDebitEntry = async (
    accountId, 
    transactionId, 
    amount, 
    balanceAfter) => {

    return await ledgerRepo.createLedgerEntry({
        accountId,
        transactionId,
        entryType: 'debit',
        amount,
        balanceAfter
    });
};

// record credit entry
export const recordCreditEntry = async (
    accountId,
    transactionId,
    amount,
    balanceAfter
) => {
    return await ledgerRepo.createLedgerEntry({
        accountId,
        transactionId,
        entryType: 'credit',
        amount,
        balanceAfter
    });
};
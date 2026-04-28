import prisma from '../config/prisma.client.js';

// create a ledger entry
export const createLedgerEntry = async (data) => {
    return prisma.ledgerEntry.create({data});   
};

// get ledger entries by account id
export const getLedgerEntriesByAccountId = async (accountId) => {
    return prisma.ledgerEntry.findMany({
        where: {accountId},
        orderBy: {createdAt: 'desc'}
    });
};

// get ledger entries by transaction Id
export const getLedgerEntriesByTransactionId = async (transactionId) => {
    return prisma.ledgerEntry.findMany({
        where: {transactionId},
    });
};

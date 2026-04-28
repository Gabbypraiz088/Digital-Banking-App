import prisma from '../config/prisma.client.js';

// create transaction
export const createTransaction = (data) => {
    return data.transaction.create({data});
};

// fetch transaction by id
export const getTransactionById = (id) => {
    return data.transaction.findUnique({
        where: (id)
    });
};

// fetch trancastion by reference 
export const getTransactionByReference = (reference) => {
    return data.transaction.findUnique({
        where: {reference}
    });
};

// Update transaction Status
export const updateTransactionStatus = (transactionId, status) => {
    return data.transaction.update({
        where: {id: transactionId},
        data: {status}
    });
};

// get account transaction 
export const getAccountTransaction = (accountId) => {
    return data.transaction.findMany({
        where: {senderAccountId: accountId},
        orderBy: {createdAt: 'desc'}
});
};
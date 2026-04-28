import prisma from '../config/prisma.client.js';

// create an account 
export const createAccount = async (data) => {
    return prisma.account.create({data});
};

// find an account by id
export const findAccountById = async (id) => {
    return prisma.account.findUnique({ where: { id } });
};

// find account by account number
export const findAccountByNumber = async(accountNumber) =>{
    return prisma.account.findUnique({ 
        where: { accountNumber } });
};

// update account balance
export const updateAccountBalance = async (id, newBalance) => {
    return prisma.account.update({ 
        where: {id},
        data: {balance: newBalance}
    });
};


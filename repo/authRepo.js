import prisma from '../config/prisma.client.js';

// create auth user
export const createAuthUser = async(data) => {
    return await prisma.authUser.create({
        data});
};

// find customer by email
export const findCustomerByEmail = async(email) => {
    return await prisma.customer.findUnique({
        where: {email},
        include: {authUser: true} 
    });
};
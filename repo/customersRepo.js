// customer repository

import prisma from "../config/prisma.client.js";

export const createCustomer = (data) => {
  return prisma.customer.create({ data });
};

export const findCustomerById = (id) => {
  return prisma.customer.findUnique({
    where: { id },
  });
};

export const findCustomerByEmail = (email) => {
  return prisma.customer.findUnique({
    where: { email },
  });
};

export const findCustomerByBVN = (bvn) => {
  return prisma.customer.findFirst({
    where: { bvn },
  });
};

export const findCustomerByNIN = (nin) => {
  return prisma.customer.findFirst({
    where: { nin },
  });
};

export const updateCustomerVerification = (customerId, status) => {
  return prisma.customer.update({
    where: { id: customerId },
    data: {
      verificationStatus: status,
    },
  });
};

export const attachAuthUser = (customerId, authUserId) => {
  return prisma.customer.update({
    where: { id: customerId },
    data: {
      authUser: {
        connect: {
          id: authUserId,
        },
      },
    },
  });
};

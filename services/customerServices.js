import * as customerRepo from "../repo/customersRepo";
import * as nibss from "../nibbs/nibbsClient";
import { verifyBVN } from "../nibbs/bvnServices";


// onboard a new customer
export const onboard = async (payload) => {
const {
    email,
    bvn,
    nin,
    firstName,
    lastName,
  } = payload;

  // check if customer already exists by email, bvn or nin
   const existingByEmail = await customerRepo.findCustomerByEmail(email);

   if (existingByEmail) {
      throw new Error("Customer with this email already exists");
   }
   const existingByBVN = await customerRepo.findCustomerByBVN(payload.bvn);

   if (existingByBVN) {
      throw new Error("Customer with this BVN already exists");
   }
   const existingByNIN = await customerRepo.findCustomerByNIN(payload.nin);

   if (existingByNIN) {
      throw new Error("Customer with this NIN already exists");
   }

   const verified = await verifyBVN(payload.bvn);

   if (!verified.success) {
      throw new Error("BVN verification failed");
   }

   const customer =
    await customerRepo.createCustomer({
      firstName,
      lastName,
      email,
      bvn,
      nin,
      verificationStatus: "PENDING",
    });

  return customer;
};

// get customer by id
export const getCustomerById = async (customerId) => {

  const customer = await customerRepo.findCustomerById(customerId);

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

// get customer's BVN details
export const getBVNDetails = async (bvn) => {
  const details = await nibss.getBVNDetails(bvn);
  return details;
};

// get customer's NIN details
export const getNINDetails = async (nin) => {
  const details = await nibss.getNINDetails(nin);
  return details;
}; 

//customer verification
export const verifyCustomer = async (customerId, status) => {
  const customer = await customerRepo.findCustomerById(customerId);
   if (!customer) {
      throw new Error("Customer not found");
   }
   return customerRepo.updateCustomer(customerId, { verificationStatus: status });
}; 

// Authorize customer by attaching auth user
export const authorizeCustomer = async (customerId, authUserId) => {
  const customer = await customerRepo.findCustomerById(customerId);
   if (!customer) {
      throw new Error("Customer not found");
   }
   return customerRepo.attachAuthUser(customerId, authUserId);
};
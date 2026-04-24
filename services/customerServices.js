import * as customerRepo from "../repo/customersRepo";



// onboard a new customer
export const onboard = async (payload) => {

   const existing = await customerRepo.findCustomerByEmail(payload.email);

   if (existing) {
      throw new Error("Customer already exists");
   }

   const verified = await nibss.verifyBVN(payload.bvn);

   if (!verified.success) {
      throw new Error("BVN verification failed");
   }

   return customerRepo.createCustomer({
      ...payload,
      verificationStatus: "VERIFIED",
   });
};

// get customer by id
export const getCustomerById = async (customerId) => {

  const customer = await customerRepository.findCustomerById(customerId);

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};


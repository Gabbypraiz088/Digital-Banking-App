import { nibssClient } from "./nibbsClient.js";

export const generateAccountNumber =
  async ({
    customerName,
    bvn,
    dob,
    phone,
    email,
  }) => {

    const response =
      await nibssClient.post(
        "/account/create",

        {
          customerName,
          bvn,
          dob,
          phone,
          email,
        }
      );

    return response.data;
};
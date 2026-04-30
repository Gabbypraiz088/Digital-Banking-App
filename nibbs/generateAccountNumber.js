import { nibssClient } from "./nibbsClient.js";

export const generateAccountNumber =
  async ({
    customerName,
    bvn,
    phone,
    email,
  }) => {

    const response =
      await nibssClient.post(
        "/account/create",

        {
          customerName,
          bvn,
          phone,
          email,
        }
      );

    return response.data;
};
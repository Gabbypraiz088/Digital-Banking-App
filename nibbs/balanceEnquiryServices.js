import { nibssClient } from "./nibbsClient.js";

export const checkAccountBalance =
  async ({
    accountNumber,
    bankCode,
  }) => {

    const response =
      await nibssClient.post(
        `/account/balance/${accountNumber}`,

        {
          accountNumber,
          bankCode,
        }
      );

    return response.data;
};
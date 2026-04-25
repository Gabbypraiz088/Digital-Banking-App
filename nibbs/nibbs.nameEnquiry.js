import { nibssClient } from "../nibbs/nibbsClient";

export const resolveAccountName = async (
  accountNumber,
  bankCode
) => {
  const response =
    await nibssClient.get(
      `/account/name-enquiry/${accountNumber}`,
      {
        params: {
          bankCode,
        },
      }
);

  return response.data;
};
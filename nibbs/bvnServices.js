// bvn.service.js

import { nibssClient } from "./nibbsClient.js";

export const verifyBVN = async (bvn) => {
  const response = await nibssClient.post(
    "/bvn/verify",
    { bvn }
  );

  return response.data;
};
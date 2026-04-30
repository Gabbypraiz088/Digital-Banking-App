// bvn.service.js

import { nibssClient } from "./nibbsClient.js";

export const verifyBVN = async (bvn) => {
  const response = await nibssClient.post(
    "/validateBvn",
    { bvn }
  );

  return response.data;
};
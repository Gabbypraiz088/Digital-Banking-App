import { nibssClient } from "./nibbsClient.js";
import { getAccessToken } from "./authServices.js";

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};


export const generateAccountNumber = async ({
  
  kycType,
  kycID,
  dob,
}) => {
  const token = await getAccessToken();

  const headers = config(token);

  const payload = {
    kycType: kycType.toLowerCase(),
    kycID: kycID, 
    dob: dob,
  };

  console.log("➡️ SENDING TO NIBSS:", payload);

  const validate = await nibssClient.post(
  "/validateBvn",
  { bvn: kycID },
  headers
);

console.log("🔎 BVN VALIDATION RESPONSE:", validate.data);

  if (!validate.data.success) {
  throw new Error(validate.data?.error?.message || "BVN validation failed");
}

  try {
    const response = await nibssClient.post(
      "/account/create",
      payload,
      headers
    );

    console.log("✅ NIBSS RESPONSE:", response.data);

    return response.data;
  } catch (error) {
    console.log("❌ NIBSS ERROR STATUS:", error.response?.status);
    console.log("❌ NIBSS ERROR DATA:", error.response?.data);

    throw error;
  }
};
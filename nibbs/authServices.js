import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


let cachedToken = null;
let expiry = null;

/**
 * Login and get JWT token
 */
export const getAccessToken = async () => {
try{
    // reuse token if already fetched
     if (cachedToken && Date.now() < expiry) {
    return cachedToken;
  }

    const response = await axios.post(
      `${process.env.NIBBS_URL}/auth/token`,
      {
        apiKey:
          process.env.NIBBS_API_KEY,

        apiSecret:
          process.env.NIBBS_API_SECRET,
      }
    );

   const token =
  response.data.token ||
  response.data.accessToken ||
  response.data.data?.token ||
  response.data.data?.accessToken;

  if (!token) {
  throw new Error("NIBSS did not return a token");
}

  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );

    cachedToken = token;
    expiry = payload.exp * 1000;

    return token;
  } catch (error) {
    console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
    throw error;
  }
};


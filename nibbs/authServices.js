import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let cachedToken = null;

/**
 * Login and get JWT token
 */
export const getAccessToken =
  async () => {

    // reuse token if already fetched
    if (cachedToken) {
      return cachedToken;
    }

    const response = await axios.post(
      `${process.env.NIBSS_URL}/auth/login`,
      {
        apiKey:
          process.env.NIBSS_API_KEY,

        apiSecret:
          process.env.NIBSS_API_SECRET,
      }
    );

    const token =
      response.data.token;

    cachedToken = token;

    return token;
  };
  
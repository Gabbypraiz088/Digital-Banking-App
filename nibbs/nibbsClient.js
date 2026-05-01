import axios from "axios";

import { getAccessToken } from "../nibbs/authServices.js";

export const nibssClient =
  axios.create({
    baseURL:
      process.env.NIBSS_URL,

    timeout: 10000,
  });

// attach JWT automatically
 
nibssClient.interceptors.request.use(
  async (config) => {

    const token = await getAccessToken();

    console.log("TOKEN:", token);

    config.headers.Authorization =
      `Bearer ${token}`;

    config.headers["Content-Type"] =
      "application/json";

    console.log("HEADERS:", config.headers);

    return config;
  },

  (error) => Promise.reject(error)
);
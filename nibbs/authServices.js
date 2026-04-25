import axios from "axios";

import { nibssClient } from "../nibbs/nibbsClient";

export const validateAuthToken =
  async () => {
    const response =
      await nibssClient.get(
        "/auth/token",
        {
          headers: {
            Authorization:
              `Bearer ${process.env.NIBSS_CLIENT_TOKEN}`,
          },
        }
      );

    return response.data;
  };
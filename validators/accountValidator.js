import { z } from "zod";

export const createAccountSchema =
  z.object({

    customerId:
      z.string().uuid(),

    accountName:
      z.string()
        .min(3),

  });
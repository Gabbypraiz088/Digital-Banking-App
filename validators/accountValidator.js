import { z } from "zod";

export const createAccountSchema =
  z.object({

    customerId:
      z.string().uuid(),

    accountName:
      z.string()
        .min(3),

  });

  export const creditAccountSchema = z.object({
  accountId: z.string(),
  amount: z.number().positive(),
});

export const debitAccountSchema = z.object({
  accountId: z.string(),
  amount: z.number().positive(),
});
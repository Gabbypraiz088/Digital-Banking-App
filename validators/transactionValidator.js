import { z } from "zod";

export const transactionValidatorSchema =
  z.object({

    senderAccountId:
      z.string().uuid(),

    receiverAccountNumber:
      z.string()
        .min(10)
        .max(10),

    receiverAccountName:
      z.string()
        .min(3),

    bankCode:
      z.string()
        .min(3),

    amount:
      z.number()
        .positive(),

    narration:
      z.string()
        .max(255)
        .optional(),

    transactionType:
      z.enum([
        "INTRA",
        "INTER",
      ]),
  });
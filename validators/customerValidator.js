import { z } from "zod";

export const createCustomerSchema =
  z.object({

    email:
      z.email(),

    phone:
      z.string()
        .min(11)
        .max(15)
        .optional(),

    bvn:
      z.string()
        .length(11)
        .optional(),

    nin:
      z.string()
        .length(11)
        .optional(),

    firstName:
      z.string()
        .min(2),

    lastName:
      z.string()
        .min(2),

    password:
      z.string()
        .min(8),
  });
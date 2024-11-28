import { z } from "zod";

export const contactFormValidator = z.object({
    firstName: z.string().min(2).max(255).trim(),
    lastName: z.string().min(2).max(255).trim(),
    email: z.string().email().trim(),
    phone: z.string().min(10).max(15).trim().optional(),
    message: z.string().min(10).max(1000).trim(),
});

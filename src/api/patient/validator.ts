// LIBRARIES
import { z } from "zod";

export const patientCreatePayloadValidator = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Password is too short" }),
});

// LIBRARIES
import { z } from "zod";
import { SPECIALITIES } from "../../constants/Specializations";

export const userCreatePayloadValidator = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Password is too short" }).trim(),
    licenseNumber: z
        .number()
        .min(3, { message: "Professional registration is too short" })
        .optional(),
    specialization: z
        .nativeEnum(SPECIALITIES, {
            message: "Invalid specialization",
        })
        .optional(),
});

export const userLoginPayloadValidator = z.object({
    email: z.string().email({ message: "Invalid credentials" }),
    password: z.string().min(1, { message: "Invalid credentials" }),
});

export const userForgotPasswordPayloadValidator = z.object({
    email: z.string().email({ message: "Invalid mail format" }),
});

export const userResetPasswordPayloadValidator = z.object({
    password: z.string().min(8, { message: "Password is too short" }).trim(),
});

export const resetPasswordTokenValidator = z.string().refine(
    (token) => {
        return /^[a-f0-9]{64}$/.test(token);
    },
    { message: "Invalid token format" }
);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordTokenValidator = exports.userResetPasswordPayloadValidator = exports.userForgotPasswordPayloadValidator = exports.userLoginPayloadValidator = exports.userCreatePayloadValidator = void 0;
// LIBRARIES
const zod_1 = require("zod");
const Specializations_1 = require("../../constants/Specializations");
exports.userCreatePayloadValidator = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email" }),
    password: zod_1.z.string().min(8, { message: "Password is too short" }).trim(),
    licenseNumber: zod_1.z
        .number()
        .min(3, { message: "Professional registration is too short" })
        .optional(),
    specialization: zod_1.z
        .nativeEnum(Specializations_1.SPECIALITIES, {
        message: "Invalid specialization",
    })
        .optional(),
});
exports.userLoginPayloadValidator = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid credentials" }),
    password: zod_1.z.string().min(1, { message: "Invalid credentials" }),
});
exports.userForgotPasswordPayloadValidator = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid mail format" }),
});
exports.userResetPasswordPayloadValidator = zod_1.z.object({
    password: zod_1.z.string().min(8, { message: "Password is too short" }).trim(),
});
exports.resetPasswordTokenValidator = zod_1.z.string().refine((token) => {
    return /^[a-f0-9]{64}$/.test(token);
}, { message: "Invalid token format" });

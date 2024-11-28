"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinicsUpdatePayloadValidator = exports.doctorUpdatePayloadValidator = void 0;
const zod_1 = require("zod");
const Genders_1 = require("../../constants/Genders");
exports.doctorUpdatePayloadValidator = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .trim()
        .min(2, "Name is too short")
        .max(100, "Name is too long")
        .optional(),
    lastName: zod_1.z
        .string()
        .trim()
        .min(2, "Name is too short")
        .max(100, "Lastname is too long")
        .optional(),
    birth_date: zod_1.z.string().date().optional(),
    genre: zod_1.z
        .nativeEnum(Genders_1.Genders, {
        message: "Invalid gender",
    })
        .optional(),
    about_me: zod_1.z
        .string()
        .trim()
        .min(3, "Text is too short")
        .max(500, "Text is too long")
        .optional(),
    phone: zod_1.z
        .string()
        .trim()
        .min(10, "Phone number is too short")
        .max(10, "Phone number is too long")
        .optional(),
    email: zod_1.z.string().trim().email({ message: "Invalid email" }).optional(),
    location: zod_1.z
        .string()
        .trim()
        .min(3, "Location is too short")
        .max(100, "Location is too long")
        .optional(),
    specialization: zod_1.z
        .string()
        .min(3, "Specialization is too short")
        .max(100, "Specialization is too long")
        .trim()
        .optional(),
});
exports.clinicsUpdatePayloadValidator = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, "Clinic name is too short")
        .max(100, "Clinic name is too long")
        .trim(),
    address: zod_1.z
        .string()
        .min(3, "Clinic Address is to short")
        .max(100, "Clinic Address is to long")
        .trim(),
    openingHours: zod_1.z
        .string()
        .min(3, "Clinic opening hours is to short")
        .max(100, "Clinic opening hours is to long")
        .trim(),
});

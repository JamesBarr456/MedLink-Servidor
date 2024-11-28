"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeDoctorPayloadValidator = exports.patientUpdatePayloadValidator = void 0;
const zod_1 = require("zod");
const Genders_1 = require("../../constants/Genders");
const BloodType_1 = require("../../constants/BloodType");
const BloodPressureTrend_1 = require("../../constants/BloodPressureTrend");
exports.patientUpdatePayloadValidator = zod_1.z.object({
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
    height: zod_1.z.number().optional(),
    weight: zod_1.z.number().optional(),
    bloodType: zod_1.z
        .nativeEnum(BloodType_1.BloodTypes, { message: "Invalid blood type" })
        .optional(),
    bloodPressureTrend: zod_1.z
        .nativeEnum(BloodPressureTrend_1.BloodPressureTrend, {
        message: "Invalid blood pressure trend",
    })
        .optional(),
    isDonor: zod_1.z.boolean().optional(),
    hasHealthyLifestyle: zod_1.z.boolean().optional(),
    hasAllergies: zod_1.z.boolean().optional(),
    hasChronicDiseases: zod_1.z.boolean().optional(),
});
exports.authorizeDoctorPayloadValidator = zod_1.z
    .string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, "Invalid JWT");

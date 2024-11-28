import { z } from "zod";
import { Genders } from "../../constants/Genders";
import { BloodTypes } from "../../constants/BloodType";
import { BloodPressureTrend } from "../../constants/BloodPressureTrend";

export const patientUpdatePayloadValidator = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "Name is too short")
        .max(100, "Name is too long")
        .optional(),
    lastName: z
        .string()
        .trim()
        .min(2, "Name is too short")
        .max(100, "Lastname is too long")
        .optional(),
    birth_date: z.string().date().optional(),
    genre: z
        .nativeEnum(Genders, {
            message: "Invalid gender",
        })
        .optional(),
    about_me: z
        .string()
        .trim()
        .min(3, "Text is too short")
        .max(500, "Text is too long")
        .optional(),
    phone: z
        .string()
        .trim()
        .min(10, "Phone number is too short")
        .max(10, "Phone number is too long")
        .optional(),
    email: z.string().trim().email({ message: "Invalid email" }).optional(),
    location: z
        .string()
        .trim()
        .min(3, "Location is too short")
        .max(100, "Location is too long")
        .optional(),
    height: z.number().optional(),
    weight: z.number().optional(),
    bloodType: z
        .nativeEnum(BloodTypes, { message: "Invalid blood type" })
        .optional(),
    bloodPressureTrend: z
        .nativeEnum(BloodPressureTrend, {
            message: "Invalid blood pressure trend",
        })
        .optional(),
    isDonor: z.boolean().optional(),
    hasHealthyLifestyle: z.boolean().optional(),
    hasAllergies: z.boolean().optional(),
    hasChronicDiseases: z.boolean().optional(),
});

export const authorizeDoctorPayloadValidator = z
    .string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, "Invalid JWT");

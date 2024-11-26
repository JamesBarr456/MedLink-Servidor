import { z } from "zod";
import { SPECIALITIES } from "../../constants/Specializations";
import { Genders } from "../../constants/Genders";

export const doctorUpdatePayloadValidator = z.object({
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
    specialization: z
        .string()
        .min(3, "Specialization is too short")
        .max(100, "Specialization is too long")
        .trim()
        .optional(),
});

export const clinicsUpdatePayloadValidator = z.object({
    name: z
        .string()
        .min(3, "Clinic name is too short")
        .max(100, "Clinic name is too long")
        .trim(),
    address: z
        .string()
        .min(3, "Clinic Address is to short")
        .max(100, "Clinic Address is to long")
        .trim(),
    openingHours: z
        .string()
        .min(3, "Clinic opening hours is to short")
        .max(100, "Clinic opening hours is to long")
        .trim(),
});

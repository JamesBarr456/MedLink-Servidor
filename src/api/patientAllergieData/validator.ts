import { z } from "zod";

export const patientAllergiesDataPayloadValidator = z.object({
    foodAllergy: z.boolean().optional(),
    foodAllergyDetails: z.string().trim().optional(),
    insectAllergy: z.boolean().optional(),
    insectAllergyDetails: z.string().trim().optional(),
    medicineAllergy: z.boolean().optional(),
    medicineAllergyDetails: z.string().trim().optional(),
    otherAllergies: z.boolean().optional(),
    otherAllergiesDetails: z.string().trim().optional(),
});

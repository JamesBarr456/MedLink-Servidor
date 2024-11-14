import { z } from "zod";

export const patientFamilyInheritancePayloadValidator = z.object({
    diabetes: z.boolean().default(false).optional(),
    diabetesDetails: z.string().optional(),
    heartDiseases: z.boolean().default(false).optional(),
    heartDiseasesDetails: z.string().optional(),
    hypertension: z.boolean().default(false).optional(),
    hypertensionDetails: z.string().optional(),
    thyroidDiseases: z.boolean().default(false).optional(),
    thyroidDiseasesDetails: z.string().optional(),
    chronicKidneyDisease: z.boolean().default(false).optional(),
    chronicKidneyDiseaseDetails: z.string().optional(),
    other: z.boolean().default(false).optional(),
    otherDetails: z.string().optional(),
});

import { z } from "zod";

export const patientNonPathologicalDataPayloadValidator = z.object({
    physicalActivity: z.boolean().optional(),
    physicalActivityDetails: z.string().trim().optional(),
    smoking: z.boolean().optional(),
    smokingDetails: z.string().trim().optional(),
    alcoholism: z.boolean().optional(),
    alcoholismDetails: z.string().trim().optional(),
    otherSubstances: z.boolean().optional(),
    otherSubstancesDetails: z.string().trim().optional(),
    recentVaccination: z.boolean().optional(),
    recentVaccinationDetails: z.string().trim().optional(),
    other: z.boolean().optional(),
    otherDetails: z.string().trim().optional(),
});

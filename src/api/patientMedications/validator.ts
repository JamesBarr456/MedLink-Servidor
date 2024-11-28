import { z } from "zod";

export const patientMedicationsPayloadValidator = z.object({
    medication: z.string().trim(),
    dosage: z.string().trim(),
    frequency: z.string().trim(),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    endDate: z
        .string()
        .optional()
        .refine((date) => date === undefined || !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }),
});

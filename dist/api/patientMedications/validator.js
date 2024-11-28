"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientMedicationsPayloadValidator = void 0;
const zod_1 = require("zod");
exports.patientMedicationsPayloadValidator = zod_1.z.object({
    medication: zod_1.z.string().trim(),
    dosage: zod_1.z.string().trim(),
    frequency: zod_1.z.string().trim(),
    startDate: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    endDate: zod_1.z
        .string()
        .optional()
        .refine((date) => date === undefined || !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
});

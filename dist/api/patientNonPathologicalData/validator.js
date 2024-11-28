"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientNonPathologicalDataPayloadValidator = void 0;
const zod_1 = require("zod");
exports.patientNonPathologicalDataPayloadValidator = zod_1.z.object({
    physicalActivity: zod_1.z.boolean().optional(),
    physicalActivityDetails: zod_1.z.string().trim().optional(),
    smoking: zod_1.z.boolean().optional(),
    smokingDetails: zod_1.z.string().trim().optional(),
    alcoholism: zod_1.z.boolean().optional(),
    alcoholismDetails: zod_1.z.string().trim().optional(),
    otherSubstances: zod_1.z.boolean().optional(),
    otherSubstancesDetails: zod_1.z.string().trim().optional(),
    recentVaccination: zod_1.z.boolean().optional(),
    recentVaccinationDetails: zod_1.z.string().trim().optional(),
    other: zod_1.z.boolean().optional(),
    otherDetails: zod_1.z.string().trim().optional(),
});

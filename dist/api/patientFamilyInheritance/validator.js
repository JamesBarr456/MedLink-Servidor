"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientFamilyInheritancePayloadValidator = void 0;
const zod_1 = require("zod");
exports.patientFamilyInheritancePayloadValidator = zod_1.z.object({
    diabetes: zod_1.z.boolean().default(false).optional(),
    diabetesDetails: zod_1.z.string().optional(),
    heartDiseases: zod_1.z.boolean().default(false).optional(),
    heartDiseasesDetails: zod_1.z.string().optional(),
    hypertension: zod_1.z.boolean().default(false).optional(),
    hypertensionDetails: zod_1.z.string().optional(),
    thyroidDiseases: zod_1.z.boolean().default(false).optional(),
    thyroidDiseasesDetails: zod_1.z.string().optional(),
    chronicKidneyDisease: zod_1.z.boolean().default(false).optional(),
    chronicKidneyDiseaseDetails: zod_1.z.string().optional(),
    other: zod_1.z.boolean().default(false).optional(),
    otherDetails: zod_1.z.string().optional(),
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientAllergiesDataPayloadValidator = void 0;
const zod_1 = require("zod");
exports.patientAllergiesDataPayloadValidator = zod_1.z.object({
    foodAllergy: zod_1.z.boolean().optional(),
    foodAllergyDetails: zod_1.z.string().trim().optional(),
    insectAllergy: zod_1.z.boolean().optional(),
    insectAllergyDetails: zod_1.z.string().trim().optional(),
    medicineAllergy: zod_1.z.boolean().optional(),
    medicineAllergyDetails: zod_1.z.string().trim().optional(),
    otherAllergies: zod_1.z.boolean().optional(),
    otherAllergiesDetails: zod_1.z.string().trim().optional(),
});

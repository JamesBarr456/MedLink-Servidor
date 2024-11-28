"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientPathologicalDataPayloadValidator = void 0;
const zod_1 = require("zod");
exports.patientPathologicalDataPayloadValidator = zod_1.z.object({
    hospitalization: zod_1.z.boolean().optional(),
    hospitalizationDetails: zod_1.z.string().trim().optional(),
    diabetes: zod_1.z.boolean().optional(),
    diabetesDetails: zod_1.z.string().trim().optional(),
    thyroidDiseases: zod_1.z.boolean().optional(),
    thyroidDiseasesDetails: zod_1.z.string().trim().optional(),
    hypertension: zod_1.z.boolean().optional(),
    hypertensionDetails: zod_1.z.string().trim().optional(),
    heartDiseases: zod_1.z.boolean().optional(),
    heartDiseasesDetails: zod_1.z.string().trim().optional(),
    trauma: zod_1.z.boolean().optional(),
    traumaDetails: zod_1.z.string().trim().optional(),
    cancer: zod_1.z.boolean().optional(),
    cancerDetails: zod_1.z.string().trim().optional(),
    tuberculosis: zod_1.z.boolean().optional(),
    tuberculosisDetails: zod_1.z.string().trim().optional(),
    transfusions: zod_1.z.boolean().optional(),
    transfusionsDetails: zod_1.z.string().trim().optional(),
    respiratoryDiseases: zod_1.z.boolean().optional(),
    respiratoryDiseasesDetails: zod_1.z.string().trim().optional(),
    gastrointestinalDiseases: zod_1.z.boolean().optional(),
    gastrointestinalDiseasesDetails: zod_1.z.string().trim().optional(),
    sexuallyTransmittedDiseases: zod_1.z.boolean().optional(),
    sexuallyTransmittedDiseasesDetails: zod_1.z.string().trim().optional(),
    chronicKidneyDisease: zod_1.z.boolean().optional(),
    chronicKidneyDiseaseDetails: zod_1.z.string().trim().optional(),
    other: zod_1.z.boolean().optional(),
    otherDetails: zod_1.z.string().trim().optional(),
});

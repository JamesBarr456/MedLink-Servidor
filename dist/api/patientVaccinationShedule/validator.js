"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientVaccinationShedulePayloadValidator = void 0;
const zod_1 = require("zod");
exports.patientVaccinationShedulePayloadValidator = zod_1.z.object({
    atBirth: zod_1.z
        .object({
        bcg: zod_1.z.boolean().optional(),
        hepatitisB1: zod_1.z.boolean().optional(),
    })
        .optional(),
    twoMonths: zod_1.z
        .object({
        pentavalent1: zod_1.z.boolean().optional(),
        hepatitisB2: zod_1.z.boolean().optional(),
        rotavirus1: zod_1.z.boolean().optional(),
        pneumococcal1: zod_1.z.boolean().optional(),
    })
        .optional(),
    fourMonths: zod_1.z
        .object({
        pentavalent2: zod_1.z.boolean().optional(),
        rotavirus2: zod_1.z.boolean().optional(),
        pneumococcal2: zod_1.z.boolean().optional(),
    })
        .optional(),
    sixMonths: zod_1.z
        .object({
        pentavalent3: zod_1.z.boolean().optional(),
        hepatitisB3: zod_1.z.boolean().optional(),
        rotavirus3: zod_1.z.boolean().optional(),
        influenza1: zod_1.z.boolean().optional(),
    })
        .optional(),
    sevenMonths: zod_1.z
        .object({
        influenza2: zod_1.z.boolean().optional(),
    })
        .optional(),
    twelveMonths: zod_1.z
        .object({
        srp1: zod_1.z.boolean().optional(),
        pneumococcal3: zod_1.z.boolean().optional(),
    })
        .optional(),
    eighteenMonths: zod_1.z
        .object({
        pentavalent4: zod_1.z.boolean().optional(),
    })
        .optional(),
    twoYears: zod_1.z
        .object({
        influenzaAnnual1: zod_1.z.boolean().optional(),
    })
        .optional(),
    threeYears: zod_1.z
        .object({
        influenzaAnnual2: zod_1.z.boolean().optional(),
    })
        .optional(),
    fourYears: zod_1.z
        .object({
        dpt: zod_1.z.boolean().optional(),
        influenzaAnnual3: zod_1.z.boolean().optional(),
    })
        .optional(),
    fiveYears: zod_1.z
        .object({
        influenzaAnnual4: zod_1.z.boolean().optional(),
        vopOpv: zod_1.z.boolean().optional(),
    })
        .optional(),
    elevenYears: zod_1.z
        .object({
        vph: zod_1.z.boolean().optional(),
    })
        .optional(),
    otherVaccines: zod_1.z.boolean().optional(),
    otherVaccinesDetails: zod_1.z.string().optional(),
});

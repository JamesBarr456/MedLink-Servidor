import { z } from "zod";

export const patientVaccinationShedulePayloadValidator = z.object({
    atBirth: z
        .object({
            bcg: z.boolean().optional(),
            hepatitisB1: z.boolean().optional(),
        })
        .optional(),
    twoMonths: z
        .object({
            pentavalent1: z.boolean().optional(),
            hepatitisB2: z.boolean().optional(),
            rotavirus1: z.boolean().optional(),
            pneumococcal1: z.boolean().optional(),
        })
        .optional(),
    fourMonths: z
        .object({
            pentavalent2: z.boolean().optional(),
            rotavirus2: z.boolean().optional(),
            pneumococcal2: z.boolean().optional(),
        })
        .optional(),
    sixMonths: z
        .object({
            pentavalent3: z.boolean().optional(),
            hepatitisB3: z.boolean().optional(),
            rotavirus3: z.boolean().optional(),
            influenza1: z.boolean().optional(),
        })
        .optional(),
    sevenMonths: z
        .object({
            influenza2: z.boolean().optional(),
        })
        .optional(),
    twelveMonths: z
        .object({
            srp1: z.boolean().optional(),
            pneumococcal3: z.boolean().optional(),
        })
        .optional(),
    eighteenMonths: z
        .object({
            pentavalent4: z.boolean().optional(),
        })
        .optional(),
    twoYears: z
        .object({
            influenzaAnnual1: z.boolean().optional(),
        })
        .optional(),
    threeYears: z
        .object({
            influenzaAnnual2: z.boolean().optional(),
        })
        .optional(),
    fourYears: z
        .object({
            dpt: z.boolean().optional(),
            influenzaAnnual3: z.boolean().optional(),
        })
        .optional(),
    fiveYears: z
        .object({
            influenzaAnnual4: z.boolean().optional(),
            vopOpv: z.boolean().optional(),
        })
        .optional(),
    elevenYears: z
        .object({
            vph: z.boolean().optional(),
        })
        .optional(),
    otherVaccines: z.boolean().optional(),
    otherVaccinesDetails: z.string().optional(),
});

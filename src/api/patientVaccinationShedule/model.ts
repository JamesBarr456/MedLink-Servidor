import { model, Schema } from "mongoose";
import IPatitientVaccinationShedule from "./interface";

const patientVaccinationSheduleSchema =
    new Schema<IPatitientVaccinationShedule>({
        atBirth: {
            bcg: { type: Boolean, required: true, default: false },
            hepatitisB1: { type: Boolean, required: true, default: false },
        },
        twoMonths: {
            pentavalent1: { type: Boolean, required: true, default: false },
            hepatitisB2: { type: Boolean, required: true, default: false },
            rotavirus1: { type: Boolean, required: true, default: false },
            pneumococcal1: { type: Boolean, required: true, default: false },
        },
        fourMonths: {
            pentavalent2: { type: Boolean, required: true, default: false },
            rotavirus2: { type: Boolean, required: true, default: false },
            pneumococcal2: { type: Boolean, required: true, default: false },
        },
        sixMonths: {
            pentavalent3: { type: Boolean, required: true, default: false },
            hepatitisB3: { type: Boolean, required: true, default: false },
            rotavirus3: { type: Boolean, required: true, default: false },
            influenza1: { type: Boolean, required: true, default: false },
        },
        sevenMonths: {
            influenza2: { type: Boolean, required: true, default: false },
        },
        twelveMonths: {
            srp1: { type: Boolean, required: true, default: false },
            pneumococcal3: { type: Boolean, required: true, default: false },
        },
        eighteenMonths: {
            pentavalent4: { type: Boolean, required: true, default: false },
        },
        twoYears: {
            influenzaAnnual1: { type: Boolean, required: true, default: false },
        },
        threeYears: {
            influenzaAnnual2: { type: Boolean, required: true, default: false },
        },
        fourYears: {
            dpt: { type: Boolean, required: true, default: false },
            influenzaAnnual3: { type: Boolean, required: true, default: false },
        },
        fiveYears: {
            influenzaAnnual4: { type: Boolean, required: true, default: false },
            vopOpv: { type: Boolean, required: true, default: false },
        },
        elevenYears: { vph: { type: Boolean, required: true, default: false } },
        otherVaccines: { Boolean, required: true, default: false },
        otherVaccinesDetails: { type: String },
    });

const PatientVaccinationShedule = model(
    "PatientVaccinationShedule",
    patientVaccinationSheduleSchema
);

export default PatientVaccinationShedule;

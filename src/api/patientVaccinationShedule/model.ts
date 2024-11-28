import { model, Schema } from "mongoose";
import IPatientVaccinationShedule from "./interface";

const patientVaccinationSheduleSchema = new Schema<IPatientVaccinationShedule>({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    atBirth: {
        type: new Schema({
            bcg: { type: Boolean, default: false },
            hepatitisB1: { type: Boolean, default: false },
        }),
        default: {},
    },
    twoMonths: {
        type: new Schema({
            pentavalent1: { type: Boolean, default: false },
            hepatitisB2: { type: Boolean, default: false },
            rotavirus1: { type: Boolean, default: false },
            pneumococcal1: { type: Boolean, default: false },
        }),
        default: {},
    },
    fourMonths: {
        type: new Schema({
            pentavalent2: { type: Boolean, default: false },
            rotavirus2: { type: Boolean, default: false },
            pneumococcal2: { type: Boolean, default: false },
        }),
        default: {},
    },
    sixMonths: {
        type: new Schema({
            pentavalent3: { type: Boolean, default: false },
            hepatitisB3: { type: Boolean, default: false },
            rotavirus3: { type: Boolean, default: false },
            influenza1: { type: Boolean, default: false },
        }),
        default: {},
    },
    sevenMonths: {
        type: new Schema({
            influenza2: { type: Boolean, default: false },
        }),
        default: {},
    },
    twelveMonths: {
        type: new Schema({
            srp1: { type: Boolean, default: false },
            pneumococcal3: { type: Boolean, default: false },
        }),
        default: {},
    },
    eighteenMonths: {
        type: new Schema({
            pentavalent4: { type: Boolean, default: false },
        }),
        default: {},
    },
    twoYears: {
        type: new Schema({
            influenzaAnnual1: { type: Boolean, default: false },
        }),
        default: {},
    },
    threeYears: {
        type: new Schema({
            influenzaAnnual2: { type: Boolean, default: false },
        }),
        default: {},
    },
    fourYears: {
        type: new Schema({
            dpt: { type: Boolean, default: false },
            influenzaAnnual3: { type: Boolean, default: false },
        }),
        default: {},
    },
    fiveYears: {
        type: new Schema({
            influenzaAnnual4: { type: Boolean, default: false },
            vopOpv: { type: Boolean, default: false },
        }),
        default: {},
    },
    elevenYears: {
        type: new Schema({
            vph: { type: Boolean, default: false },
        }),
        default: {},
    },
    otherVaccines: { type: Boolean, default: false },
    otherVaccinesDetails: { type: String },
});

const PatientVaccinationShedule = model(
    "PatientVaccinationShedule",
    patientVaccinationSheduleSchema
);

export default PatientVaccinationShedule;

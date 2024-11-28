"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const patientVaccinationSheduleSchema = new mongoose_1.Schema({
    patientId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    atBirth: {
        type: new mongoose_1.Schema({
            bcg: { type: Boolean, default: false },
            hepatitisB1: { type: Boolean, default: false },
        }),
        default: {},
    },
    twoMonths: {
        type: new mongoose_1.Schema({
            pentavalent1: { type: Boolean, default: false },
            hepatitisB2: { type: Boolean, default: false },
            rotavirus1: { type: Boolean, default: false },
            pneumococcal1: { type: Boolean, default: false },
        }),
        default: {},
    },
    fourMonths: {
        type: new mongoose_1.Schema({
            pentavalent2: { type: Boolean, default: false },
            rotavirus2: { type: Boolean, default: false },
            pneumococcal2: { type: Boolean, default: false },
        }),
        default: {},
    },
    sixMonths: {
        type: new mongoose_1.Schema({
            pentavalent3: { type: Boolean, default: false },
            hepatitisB3: { type: Boolean, default: false },
            rotavirus3: { type: Boolean, default: false },
            influenza1: { type: Boolean, default: false },
        }),
        default: {},
    },
    sevenMonths: {
        type: new mongoose_1.Schema({
            influenza2: { type: Boolean, default: false },
        }),
        default: {},
    },
    twelveMonths: {
        type: new mongoose_1.Schema({
            srp1: { type: Boolean, default: false },
            pneumococcal3: { type: Boolean, default: false },
        }),
        default: {},
    },
    eighteenMonths: {
        type: new mongoose_1.Schema({
            pentavalent4: { type: Boolean, default: false },
        }),
        default: {},
    },
    twoYears: {
        type: new mongoose_1.Schema({
            influenzaAnnual1: { type: Boolean, default: false },
        }),
        default: {},
    },
    threeYears: {
        type: new mongoose_1.Schema({
            influenzaAnnual2: { type: Boolean, default: false },
        }),
        default: {},
    },
    fourYears: {
        type: new mongoose_1.Schema({
            dpt: { type: Boolean, default: false },
            influenzaAnnual3: { type: Boolean, default: false },
        }),
        default: {},
    },
    fiveYears: {
        type: new mongoose_1.Schema({
            influenzaAnnual4: { type: Boolean, default: false },
            vopOpv: { type: Boolean, default: false },
        }),
        default: {},
    },
    elevenYears: {
        type: new mongoose_1.Schema({
            vph: { type: Boolean, default: false },
        }),
        default: {},
    },
    otherVaccines: { type: Boolean, default: false },
    otherVaccinesDetails: { type: String },
});
const PatientVaccinationShedule = (0, mongoose_1.model)("PatientVaccinationShedule", patientVaccinationSheduleSchema);
exports.default = PatientVaccinationShedule;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LIBRARIES
const mongoose_1 = require("mongoose");
// MODELS
const model_1 = __importDefault(require("../user/model"));
const Patient = model_1.default.discriminator("Patient", new mongoose_1.Schema({
    insuranceProvider: { type: String },
    insuranceNumber: { type: String },
    clinicalData: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PatientClinicalData",
    },
    allergiesData: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PatientAllergieData",
    },
    pathologicalData: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PatientPathologicalData",
    },
    nonPathologicalData: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PatientNonPathologicalData",
    },
    familyInheritance: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PatientFamilyInheritance",
    },
    vaccinationShedule: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PatientVaccinationShedule",
    },
    documents: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Document" }],
    medications: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: "PatientMedication" },
    ],
    authorizedDoctors: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Doctor",
        },
    ],
}));
exports.default = Patient;

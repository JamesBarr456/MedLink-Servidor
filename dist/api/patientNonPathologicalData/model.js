"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const patientNonPathologicalData = new mongoose_1.Schema({
    patientId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Patient" },
    physicalActivity: { type: Boolean, default: false },
    physicalActivityDetails: { type: String },
    smoking: { type: Boolean, default: false },
    smokingDetails: { type: String },
    alcoholism: { type: Boolean, default: false },
    alcoholismDetails: { type: String },
    otherSubstances: { type: Boolean, default: false },
    otherSubstancesDetails: { type: String },
    recentVaccination: { type: Boolean, default: false },
    recentVaccinationDetails: { type: String },
    other: { type: Boolean, default: false },
    otherDetails: { type: String },
});
const PatientNonPathologicalData = (0, mongoose_1.model)("PatientNonPathologicalData", patientNonPathologicalData);
exports.default = PatientNonPathologicalData;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const patientMedicationSchema = new mongoose_1.Schema({
    patientId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Patient" },
    medication: { type: String },
    dosage: { type: String },
    frequency: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
});
const PatientMedication = (0, mongoose_1.model)("PatientMedication", patientMedicationSchema);
exports.default = PatientMedication;

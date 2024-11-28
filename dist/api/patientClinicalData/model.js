"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BloodPressureTrend_1 = require("../../constants/BloodPressureTrend");
const PatientClinicalDataSchema = new mongoose_1.Schema({
    patientId: { type: mongoose_1.Schema.Types.ObjectId },
    height: { type: Number },
    weight: { type: Number },
    bloodType: { type: String },
    bloodPressureTrend: {
        type: String,
        enum: BloodPressureTrend_1.BloodPressureTrend,
        default: BloodPressureTrend_1.BloodPressureTrend.NORMAL,
    },
    isDonor: { type: Boolean },
    hasAllergies: { type: Boolean },
    hasChronicDiseases: { type: Boolean },
    hasHealthyLifestyle: { type: Boolean },
    createdAt: { type: Date },
});
const PatientClinicalData = (0, mongoose_1.model)("PatientClinicalData", PatientClinicalDataSchema);
exports.default = PatientClinicalData;

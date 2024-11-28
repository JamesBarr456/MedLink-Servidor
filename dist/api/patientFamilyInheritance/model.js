"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const patientFamilyInheritanceSchema = new mongoose_1.Schema({
    patientId: { type: mongoose_1.Schema.Types.ObjectId, unique: true },
    diabetes: { type: Boolean, required: true, default: false },
    diabetesDetails: { type: String, required: false },
    heartDiseases: { type: Boolean, required: true, default: false },
    heartDiseasesDetails: { type: String, required: false },
    hypertension: { type: Boolean, required: true, default: false },
    hypertensionDetails: { type: String, required: false },
    thyroidDiseases: { type: Boolean, required: true, default: false },
    thyroidDiseasesDetails: { type: String, required: false },
    chronicKidneyDisease: { type: Boolean, required: true, default: false },
    chronicKidneyDiseaseDetails: { type: String, required: false },
    other: { type: Boolean, required: true, default: false },
    otherDetails: { type: String, required: false },
});
const PatientFamilyInheritance = (0, mongoose_1.model)("PatientFamilyInheritance", patientFamilyInheritanceSchema);
exports.default = PatientFamilyInheritance;

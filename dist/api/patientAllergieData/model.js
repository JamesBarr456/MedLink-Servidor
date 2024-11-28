"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const patientAllergieData = new mongoose_1.Schema({
    patientId: { type: mongoose_1.Schema.Types.ObjectId, unique: true },
    foodAllergy: { type: Boolean },
    foodAllergyDetails: { type: String },
    insectAllergy: { type: Boolean },
    insectAllergyDetails: { type: String },
    medicineAllergy: { type: Boolean },
    medicineAllergyDetails: { type: String },
    otherAllergies: { type: Boolean },
    otherAllergiesDetails: { type: String },
});
const PatientAllergieData = (0, mongoose_1.model)("PatientAllergieData", patientAllergieData);
exports.default = PatientAllergieData;

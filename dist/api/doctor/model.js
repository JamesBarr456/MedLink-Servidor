"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LIBRARIES
const mongoose_1 = require("mongoose");
// MODELS
const model_1 = __importDefault(require("../user/model"));
const Specializations_1 = require("../../constants/Specializations");
const Doctor = model_1.default.discriminator("Doctor", new mongoose_1.Schema({
    specialization: [{ type: String, enum: Specializations_1.SPECIALITIES, required: true }],
    licenseNumber: { type: Number, required: true },
    clinics: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Clinic" }],
    patients: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Patient" }],
    skills: [{ type: String }],
    // FIXME: Esto lo ponemos en un nuevo modelo?
    // consultations: [
    //     {
    //         consultationId: Schema.Types.ObjectId,
    //         patientId: Schema.Types.ObjectId,
    //         date: { type: Date, required: true },
    //         diagnosis: String,
    //         treatment: String,
    //         notes: String,
    //     },
    // ],
}));
exports.default = Doctor;

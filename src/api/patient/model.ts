// LIBRARIES
import { Schema } from "mongoose";
// MODELS
import User from "../user/model";
// INTERFACES
import { IPatient } from "./interface";

const Patient = User.discriminator(
    "Patient",
    new Schema<IPatient>({
        insuranceProvider: { type: String },
        insuranceNumber: { type: String },
        files: [{ type: String }],
        clinicalData: {
            type: Schema.Types.ObjectId,
            ref: "PatientClinicalData",
        },
        allergiesData: {
            type: Schema.Types.ObjectId,
            ref: "PatientAllergieData",
        },
        pathologicalData: {
            type: Schema.Types.ObjectId,
            ref: "PatientPathologicalData",
        },
        nonPathologicalData: {
            type: Schema.Types.ObjectId,
            ref: "PatientNonPathologicalData",
        },
        familyInheritance: {
            type: Schema.Types.ObjectId,
            ref: "PatientFamilyInheritance",
        },
        vaccinationShedule: {
            type: Schema.Types.ObjectId,
            ref: "PatientVaccinationShedule",
        },
        documents: [{ type: Schema.Types.ObjectId, ref: "Document" }],
        medications: [
            { type: Schema.Types.ObjectId, ref: "PatientMedication" },
        ],
        authorizedDoctors: [
            {
                type: Schema.Types.ObjectId,
                ref: "Doctor",
            },
        ],
    })
);

export default Patient;

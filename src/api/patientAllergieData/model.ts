import { model, Schema } from "mongoose";
import IPatientAllergieData from "./interfaces";

const patientAllergieData = new Schema<IPatientAllergieData>({
    foodAllergy: { type: Boolean },
    foodAllergyDetails: { type: String },
    insectAllergy: { type: Boolean },
    insectAllergyDetails: { type: String },
    medicineAllergy: { type: Boolean },
    medicineAllergyDetails: { type: String },
    otherAllergies: { type: Boolean },
    otherAllergiesDetails: { type: String },
});

const PatientAllergieData = model<IPatientAllergieData>(
    "PatientAllergieData",
    patientAllergieData
);

export default PatientAllergieData;

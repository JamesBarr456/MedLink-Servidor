import { Document, Types } from "mongoose";

export default interface IPatientAllergieData extends Document {
    patientId: Types.ObjectId;
    foodAllergy: boolean;
    foodAllergyDetails: string;
    insectAllergy: boolean;
    insectAllergyDetails: string;
    medicineAllergy: boolean;
    medicineAllergyDetails: string;
    otherAllergies: boolean;
    otherAllergiesDetails: string;
}

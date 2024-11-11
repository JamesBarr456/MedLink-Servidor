import { Document } from "mongoose";

export default interface IPatientAllergieData extends Document {
    foodAllergy: boolean;
    foodAllergyDetails: string;
    insectAllergy: boolean;
    insectAllergyDetails: string;
    medicineAllergy: boolean;
    medicineAllergyDetails: string;
    otherAllergies: boolean;
    otherAllergiesDetails: string;
}

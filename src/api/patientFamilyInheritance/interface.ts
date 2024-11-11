import { Document } from "mongoose";

export default interface IPatientFamilyInheritance extends Document {
    diabetes: boolean;
    diabetesDetails: string;
    heartDiseases: boolean;
    heartDiseasesDetails: string;
    hypertension: boolean;
    hypertensionDetails: string;
    thyroidDiseases: boolean;
    thyroidDiseasesDetails: string;
    chronicKidneyDisease: boolean;
    chronicKidneyDiseaseDetails: string;
    other: boolean;
    otherDetails: string;
}

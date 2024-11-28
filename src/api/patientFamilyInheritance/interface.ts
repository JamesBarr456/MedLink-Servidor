import { Document, Types } from "mongoose";

export default interface IPatientFamilyInheritance extends Document {
    patientId: Types.ObjectId;
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

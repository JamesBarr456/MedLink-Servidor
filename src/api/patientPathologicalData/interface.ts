import { Document, Types } from "mongoose";

export default interface IPatientPathologicalData extends Document {
    patientId: Types.ObjectId;
    hospitalization: boolean;
    hospitalizationDetails: string;
    diabetes: boolean;
    diabetesDetails: string;
    thyroidDiseases: boolean;
    thyroidDiseasesDetails: string;
    hypertension: boolean;
    hypertensionDetails: string;
    heartDiseases: boolean;
    heartDiseasesDetails: string;
    trauma: boolean;
    traumaDetails: string;
    cancer: boolean;
    cancerDetails: string;
    tuberculosis: boolean;
    tuberculosisDetails: string;
    transfusions: boolean;
    transfusionsDetails: string;
    respiratoryDiseases: boolean;
    respiratoryDiseasesDetails: string;
    gastrointestinalDiseases: boolean;
    gastrointestinalDiseasesDetails: string;
    sexuallyTransmittedDiseases: boolean;
    sexuallyTransmittedDiseasesDetails: string;
    chronicKidneyDisease: boolean;
    chronicKidneyDiseaseDetails: string;
    other: boolean;
    otherDetails: string;
}

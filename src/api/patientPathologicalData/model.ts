import { model, Schema } from "mongoose";
import IPatientPathologicalData from "./interface";

const patientPathologicalDataSchema = new Schema<IPatientPathologicalData>({
    patientId: { type: Schema.Types.ObjectId, unique: true },
    hospitalization: { type: Boolean },
    hospitalizationDetails: { type: String },
    diabetes: { type: Boolean },
    diabetesDetails: { type: String },
    thyroidDiseases: { type: Boolean },
    thyroidDiseasesDetails: { type: String },
    hypertension: { type: Boolean },
    hypertensionDetails: { type: String },
    heartDiseases: { type: Boolean },
    heartDiseasesDetails: { type: String },
    trauma: { type: Boolean },
    traumaDetails: { type: String },
    cancer: { type: Boolean },
    cancerDetails: { type: String },
    tuberculosis: { type: Boolean },
    tuberculosisDetails: { type: String },
    transfusions: { type: Boolean },
    transfusionsDetails: { type: String },
    respiratoryDiseases: { type: Boolean },
    respiratoryDiseasesDetails: { type: String },
    gastrointestinalDiseases: { type: Boolean },
    gastrointestinalDiseasesDetails: { type: String },
    sexuallyTransmittedDiseases: { type: Boolean },
    sexuallyTransmittedDiseasesDetails: { type: String },
    chronicKidneyDisease: { type: Boolean },
    chronicKidneyDiseaseDetails: { type: String },
    other: { type: Boolean },
    otherDetails: { type: String },
});

const PatientPathologicalData = model<IPatientPathologicalData>(
    "PatientPathologicalData",
    patientPathologicalDataSchema
);

export default PatientPathologicalData;

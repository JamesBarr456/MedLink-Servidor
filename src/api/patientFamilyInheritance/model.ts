import { model, Schema } from "mongoose";
import IPatientFamilyInheritance from "./interface";

const patientFamilyInheritanceSSchema = new Schema<IPatientFamilyInheritance>({
    diabetes: { type: Boolean },
    diabetesDetails: { type: String },
    heartDiseases: { type: Boolean },
    heartDiseasesDetails: { type: String },
    hypertension: { type: Boolean },
    hypertensionDetails: { type: String },
    thyroidDiseases: { type: Boolean },
    thyroidDiseasesDetails: { type: String },
    chronicKidneyDisease: { type: Boolean },
    chronicKidneyDiseaseDetails: { type: String },
    other: { type: Boolean },
    otherDetails: { type: String },
});

const PatientFamilyInheritance = model<IPatientFamilyInheritance>(
    "PatientFamilyInheritance",
    patientFamilyInheritanceSSchema
);

export default PatientFamilyInheritance;

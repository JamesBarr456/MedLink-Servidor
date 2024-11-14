import { model, Schema } from "mongoose";
import IPatientFamilyInheritance from "./interface";

const patientFamilyInheritanceSchema = new Schema<IPatientFamilyInheritance>({
    patientId: { type: Schema.Types.ObjectId, unique: true },
    diabetes: { type: Boolean, required: true, default: false },
    diabetesDetails: { type: String, required: false },
    heartDiseases: { type: Boolean, required: true, default: false },
    heartDiseasesDetails: { type: String, required: false },
    hypertension: { type: Boolean, required: true, default: false },
    hypertensionDetails: { type: String, required: false },
    thyroidDiseases: { type: Boolean, required: true, default: false },
    thyroidDiseasesDetails: { type: String, required: false },
    chronicKidneyDisease: { type: Boolean, required: true, default: false },
    chronicKidneyDiseaseDetails: { type: String, required: false },
    other: { type: Boolean, required: true, default: false },
    otherDetails: { type: String, required: false },
});

const PatientFamilyInheritance = model<IPatientFamilyInheritance>(
    "PatientFamilyInheritance",
    patientFamilyInheritanceSchema
);

export default PatientFamilyInheritance;

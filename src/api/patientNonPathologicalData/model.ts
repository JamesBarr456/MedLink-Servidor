import { model, Schema } from "mongoose";
import IPatientNonPathologicalData from "./interface";

const patientNonPathologicalData = new Schema<IPatientNonPathologicalData>({
    patientId: { type: Schema.Types.ObjectId, ref: "Patient" },
    physicalActivity: { type: Boolean, default: false },
    physicalActivityDetails: { type: String },
    smoking: { type: Boolean, default: false },
    smokingDetails: { type: String },
    alcoholism: { type: Boolean, default: false },
    alcoholismDetails: { type: String },
    otherSubstances: { type: Boolean, default: false },
    otherSubstancesDetails: { type: String },
    recentVaccination: { type: Boolean, default: false },
    recentVaccinationDetails: { type: String },
    other: { type: Boolean, default: false },
    otherDetails: { type: String },
});

const PatientNonPathologicalData = model<IPatientNonPathologicalData>(
    "PatientNonPathologicalData",
    patientNonPathologicalData
);

export default PatientNonPathologicalData;

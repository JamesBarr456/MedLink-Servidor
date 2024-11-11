import { model, Schema } from "mongoose";
import IPatientNonPathologicalData from "./interface";

const patientNonPathogicalData = new Schema<IPatientNonPathologicalData>({
    physicalActivity: { type: Boolean },
    physicalActivityDetails: { type: String },
    smoking: { type: Boolean },
    smokingDetails: { type: String },
    alcoholism: { type: Boolean },
    alcoholismDetails: { type: String },
    otherSubstances: { type: Boolean },
    otherSubstancesDetails: { type: String },
    recentVaccination: { type: Boolean },
    recentVaccinationDetails: { type: String },
    other: { type: Boolean },
    otherDetails: { type: String },
});

const PatientNonPathologicalData = model<IPatientNonPathologicalData>(
    "PatientNonPathologicalData",
    patientNonPathogicalData
);

export default PatientNonPathologicalData;

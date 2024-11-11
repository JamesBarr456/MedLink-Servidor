import { model, Schema } from "mongoose";
import IPatientClinicalData from "./interface";
import { BloodPressureTrend } from "../../constants/BloodPressureTrend";

const PatientClinicalDataSchema = new Schema<IPatientClinicalData>({
    patientId: { type: Schema.Types.ObjectId },
    height: { type: Number },
    weight: { type: Number },
    bloodType: { type: String },
    bloodPressureTrend: {
        type: String,
        enum: BloodPressureTrend,
        default: BloodPressureTrend.NORMAL,
    },
    isDonor: { type: Boolean },
    hasAllergies: { type: Boolean },
    hasChronicDiseases: { type: Boolean },
    hasHealthyLifestyle: { type: Boolean },
    createdAt: { type: Date },
});

const PatientClinicalData = model<IPatientClinicalData>(
    "PatientClinicalData",
    PatientClinicalDataSchema
);

export default PatientClinicalData;

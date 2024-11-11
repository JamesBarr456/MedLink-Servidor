import { model, Schema } from "mongoose";
import IPatientMedication from "./interface";

const patientMedicationSchema = new Schema<IPatientMedication>({
    medication: { type: String },
    dosage: { type: String },
    frequency: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
});

const PatientMedication = model<IPatientMedication>(
    "PatientMedication",
    patientMedicationSchema
);

export default PatientMedication;

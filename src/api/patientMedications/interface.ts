import { Document, Types } from "mongoose";

export default interface IPatientMedication extends Document {
    patientId: Types.ObjectId;
    medication: string;
    dosage: string;
    frequency: string;
    startDate: Date;
    endDate: Date;
}

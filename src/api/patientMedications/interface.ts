import { Document } from "mongoose";

export default interface IPatientMedication extends Document {
    medication: string;
    dosage: string;
    frequency: string;
    startDate: Date;
    endDate: Date;
}

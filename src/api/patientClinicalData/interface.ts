import { Types, Document } from "mongoose";
import { BloodPressureTrend } from "../../constants/BloodPressureTrend";

export default interface IPatientClinicalData extends Document {
    patientId: Types.ObjectId;
    height: number;
    weight: number;
    bloodType: string;
    bloodPressureTrend: BloodPressureTrend;
    isDonor: boolean;
    hasAllergies: boolean;
    hasChronicDiseases: boolean;
    hasHealthyLifestyle: boolean;
    createdAt: Date;
}

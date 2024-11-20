import { Document, Types } from "mongoose";

export default interface IPatientNonPathologicalData extends Document {
    patientId: Types.ObjectId;
    physicalActivity: boolean;
    physicalActivityDetails: string;
    smoking: boolean;
    smokingDetails: string;
    alcoholism: boolean;
    alcoholismDetails: string;
    otherSubstances: boolean;
    otherSubstancesDetails: string;
    recentVaccination: boolean;
    recentVaccinationDetails: string;
    other: boolean;
    otherDetails: string;
}

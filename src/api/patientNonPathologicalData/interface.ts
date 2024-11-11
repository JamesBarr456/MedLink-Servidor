import { Document } from "mongoose";

export default interface IPatientNonPathologicalData extends Document {
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

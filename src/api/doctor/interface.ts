// LIBRARIES
import { Types } from "mongoose";
// INTERFACES
import { IUser } from "../user/interface";

export interface IDoctor extends IUser {
    specialization: string;
    address: string;
    licenseNumber: number;
    clinic: string;
    patients: Types.ObjectId[];
    consultations: IConsultation[];
}

export interface IConsultation {
    consultationId: Types.ObjectId;
    patientId: Types.ObjectId;
    date: Date;
    diagnosis: string;
    treatment: string;
    notes: string;
}

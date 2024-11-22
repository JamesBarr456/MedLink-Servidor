// LIBRARIES
import { Types } from "mongoose";
// INTERFACES
import { IUser } from "../user/interface";
import { SPECIALITIES } from "../../constants/Specializations";

export interface IDoctor extends IUser {
    specialization: SPECIALITIES;
    licenseNumber: number;
    clinic: string[];
    patients: Types.ObjectId[];
    // consultations: IConsultation[];
}

// export interface IConsultation {
//     consultationId: Types.ObjectId;
//     patientId: Types.ObjectId;
//     date: Date;
//     diagnosis: string;
//     treatment: string;
//     notes: string;
// }

export interface DoctorCreateFields {
    email: string;
    password: string;
    licenseNumber: number;
    specialization: SPECIALITIES;
}

export interface DoctorResponse {
    id: string;
    firstName?: string;
    lastName?: string;
    licenseNumber: number;
    email: string;
    role: string;
    specialization: SPECIALITIES;
    location?: string;
    avatar?: string;
    phone?: number;
    clinic?: string;
    patients?: Types.ObjectId[];
    consultations?: Consultations[];
}

interface Consultations {
    consultationId: Types.ObjectId;
    patientId: Types.ObjectId;
    date: Date;
    diagnosis: string;
    treatment: string;
    notes: string;
}

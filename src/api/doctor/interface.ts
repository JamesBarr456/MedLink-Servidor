// LIBRARIES
import { Types } from "mongoose";
// INTERFACES
import { IUser } from "../user/interface";
import { SPECIALITIES } from "../../constants/Specializations";
import { IPatient, PatientResponse } from "../patient/interface";

export interface IDoctor extends IUser {
    specialization: SPECIALITIES[];
    licenseNumber: number;
    clinic: string[];
    patients: Types.ObjectId[];
    // consultations: IConsultation[];
}
export interface IDoctorPopulated extends IUser {
    specialization: SPECIALITIES[];
    licenseNumber: number;
    clinic: string[];
    patients: IPatient[];
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
    specialization: SPECIALITIES[];
    location?: string;
    avatar?: string;
    phone?: number;
    clinic?: string[];
    patients?: (Types.ObjectId | Partial<PatientResponse>)[];
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

export interface DoctorUpdateFields {
    firstName: string;
    lastName: string;
    birth_date: string;
    genre: string;
    about_me: string;
    phone: number;
    email: string;
    location: string;
    specialization: string | string[];
}

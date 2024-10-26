// INTERFACES
import { IUser } from "../user/interface";

export interface IPatient extends IUser {
    dateOfBirth: Date;
    gender: string;
    address: string;
    insuranceProvider: string;
    insuranceNumber: string;
    avatar: string;
    files: string[];
    allergies: string[];
    medications: string[];
    bloodType: string;
}

export interface PatientCreateFields {
    email: string;
    password: string;
    avatarUrl?: string;
}

export interface PatientResponse {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    role: string;
    avatarUrl?: string;
}

export interface PatientLoginFields {
    email: string;
    password: string;
}
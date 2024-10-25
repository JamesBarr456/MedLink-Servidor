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

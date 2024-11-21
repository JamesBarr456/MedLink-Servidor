// INTERFACES
import { Types } from "mongoose";
import { IUser } from "../user/interface";
import { Genders } from "../../constants/Genders";
import { BloodPressureTrend } from "../../constants/BloodPressureTrend";
import IPatientClinicalData from "../patientClinicalData/interface";
import IPatientAllergieData from "../patientAllergieData/interfaces";
import IPatientFamilyInheritance from "../patientFamilyInheritance/interface";
import IPatientPathologicalData from "../patientPathologicalData/interface";
import IPatientNonPathologicalData from "../patientNonPathologicalData/interface";
import IPatientVaccinationShedule from "../patientVaccinationShedule/interface";
import IPatientMedication from "../patientMedications/interface";

export interface IPatient extends IUser {
    insuranceProvider: string;
    insuranceNumber: string;
    files: string[];
    clinicalData: Types.ObjectId;
    allergiesData: Types.ObjectId;
    pathologicalData: Types.ObjectId;
    nonPathologicalData: Types.ObjectId;
    familyInheritance: Types.ObjectId;
    vaccinationShedule: Types.ObjectId;
    documents: Types.ObjectId[];
    medications: Types.ObjectId[];
    authorizedDoctors: Types.ObjectId[];
}

export interface PatientCreateFields {
    email: string;
    password: string;
}

export interface PatientUpdateFields {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: Genders;
    aboutMe: string;
    email: string;
    avatar: string;
    phone: number;
    location: string;
    height: number;
    weight: number;
    bloodType: string;
    bloodPressureTrend: BloodPressureTrend;
    isDonor: boolean;
    hasAllergies: boolean;
    hasChronicDiseases: boolean;
    hasHealthyLifestyle: boolean;
}

export interface PatientResponse
    extends Omit<
        IPatient,
        | "password"
        | "clinicalData"
        | "allergiesData"
        | "pathologicalData"
        | "nonPathologicalData"
        | "familyInheritance"
        | "vaccinationShedule"
        | "documents"
        | "medications"
        | "authorizedDoctors"
    > {
    id: string;
    clinicalData: string | Partial<IPatientClinicalData>;
    allergiesData: string | Partial<IPatientAllergieData>;
    pathologicalData: string | Partial<IPatientPathologicalData>;
    nonPathologicalData: string | Partial<IPatientNonPathologicalData>;
    familyInheritance: string | Partial<IPatientFamilyInheritance>;
    vaccinationShedule: string | Partial<IPatientVaccinationShedule>;
    documents: string[];
    medications: (string | Partial<IPatientMedication>)[];
    authorizedDoctors: string[];
}

export interface PatientLoginFields {
    email: string;
    password: string;
}

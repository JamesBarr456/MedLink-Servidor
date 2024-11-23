// MODELS
import Patient from "./model";
// DAOS
import UserDAO from "../user/dao";
// DTOS
import PatientDto from "./dto";
// UTILS
import HttpError from "../../utils/HttpError.utils";
//ROLES
import { Roles } from "../../constants/Roles";
// CONSTANTS
import HTTP_STATUS from "../../constants/HttpStatus";
// INTERFACES
import {
    IPatient,
    PatientCreateFields,
    PatientResponse,
    PatientUpdateFields,
} from "./interface";
import { ITokenPayload } from "../auth/interface";
import PatientDAO from "./dao";
import { Types } from "mongoose";
import PatientClinicalDataService from "../patientClinicalData/services";
import { PatientFields } from "../../constants/PatientFields";
import PatientRepository from "./repository";

export default class PatientService {
    static ClinicalFields = [
        "height",
        "weight",
        "bloodType",
        "bloodPressureTrend",
        "isDonor",
        "hasAllergies",
        "hasChronicDiseases",
        "hasHealthyLifestyle",
    ];
    static async createPatient(
        patient: PatientCreateFields
    ): Promise<Partial<PatientResponse>> {
        try {
            const patientDao = new UserDAO(Patient);
            const patientFound = await patientDao.find({
                email: patient.email,
            });

            if (patientFound && patientFound.length > 0) {
                throw new HttpError(
                    "User already exists",
                    "USER_ALREADY_EXISTS",
                    HTTP_STATUS.CONFLICT
                );
            }

            const patientPayload: IPatient = new Patient({
                ...patient,
                createdAt: new Date(),
            });

            const patientCreated: IPatient = await patientDao.create(
                patientPayload
            );

            if (!patientCreated) {
                throw new HttpError(
                    "User not created",
                    "USER_NOT_CREATED",
                    HTTP_STATUS.SERVER_ERROR
                );
            }

            const userCleaned: Partial<PatientResponse> =
                PatientDto.patientDTO(patientCreated);
            return userCleaned;
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );

            throw error;
        }
    }

    static async updatePatient(
        user: ITokenPayload,
        updateFields: Partial<PatientUpdateFields>
    ): Promise<Partial<PatientResponse>> {
        try {
            const patientDao = new PatientDAO();
            const patientFound = await patientDao.read(user.id);
            if (!patientFound) {
                throw new HttpError(
                    "User not found",
                    "USER_NOT_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }

            const patientPayload: Partial<IPatient> = {
                ...patientFound,
                ...updateFields,
            };

            if (
                Object.keys(updateFields).some((field) =>
                    this.ClinicalFields.includes(field)
                )
            ) {
                const patientClinicalDataCreated =
                    await PatientClinicalDataService.createClinicalData(
                        updateFields,
                        new Types.ObjectId(user.id)
                    );

                patientPayload.clinicalData =
                    patientClinicalDataCreated._id as Types.ObjectId;
            }

            const updatedPatient = await patientDao.update(
                patientFound._id.toString(),
                patientPayload
            );

            if (!updatedPatient) {
                throw new HttpError(
                    "User not updated",
                    "USER_NOT_UPDATED",
                    HTTP_STATUS.SERVER_ERROR
                );
            }

            const userCleaned: Partial<PatientResponse> =
                PatientDto.patientDTO(updatedPatient);

            return userCleaned;
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );

            throw error;
        }
    }

    static async addMedicalInformation(
        user: ITokenPayload,
        modelID: Types.ObjectId | Types.ObjectId[],
        fieldToUpdate: PatientFields
    ): Promise<Partial<PatientResponse>> {
        try {
            const patientDao = new PatientDAO();
            const patientFound = await patientDao.read(user.id);
            console.log("🚀 ~ patientFound:", patientFound?.medications);
            console.log("🚀 ~ modelID:", modelID);
            if (!patientFound) {
                throw new HttpError(
                    "User not found",
                    "USER_NOT_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }

            const idToAdd: Types.ObjectId | Types.ObjectId[] =
                fieldToUpdate === PatientFields.DOCUMENTS
                    ? [
                          ...patientFound.documents,
                          ...(modelID as Types.ObjectId[]),
                      ]
                    : fieldToUpdate === PatientFields.MEDICATIONS_DATA
                    ? [
                          ...patientFound.medications.map((med) => med._id),
                          modelID as Types.ObjectId,
                      ]
                    : (modelID as Types.ObjectId);

            console.log("🚀 ~ idToAdd:", idToAdd);
            const patientPayload: Partial<IPatient> = {
                ...patientFound,
                [fieldToUpdate]: idToAdd,
            };

            const updatedPatient = await patientDao.update(
                patientFound._id.toString(),
                patientPayload
            );

            if (!updatedPatient) {
                throw new HttpError(
                    "User not updated",
                    "USER_NOT_UPDATED",
                    HTTP_STATUS.SERVER_ERROR
                );
            }
            const userCleaned: Partial<PatientResponse> =
                PatientDto.patientDTO(updatedPatient);

            return userCleaned;
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );

            throw error;
        }
    }

    static async getAllPatients(): Promise<Partial<PatientResponse>[]> {
        try {
            const patientDao = new UserDAO(Patient);
            const patients = await patientDao.find({ role: Roles.PATIENT });

            if (!patients || patients.length === 0) {
                throw new HttpError(
                    "No patients found",
                    "NO_PATIENTS_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }

            const patientsResponse = PatientDto.patientsArrayDTO(patients);

            return patientsResponse;
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );
            throw error;
        }
    }

    static async getPatientById(
        id: string,
        user?: ITokenPayload
    ): Promise<Partial<PatientResponse>> {
        try {
            if (user && user.role === Roles.PATIENT && user.id !== id) {
                throw new HttpError(
                    "You are not authorized to access this patient",
                    "NOT_AUTHORIZED",
                    HTTP_STATUS.UNAUTHORIZED
                );
            }
            let patient;

            if (user && user.role === Roles.DOCTOR && user.id !== id) {
                const patientRepository = new PatientRepository(Patient);
                const patientByDoctor = await patientRepository.getPatient({
                    and: [{ _id: id }, { authorizedDoctors: user.id }],
                });
                patient = patientByDoctor;
            } else {
                const patientDao = new PatientDAO();
                patient = await patientDao.read(id);
            }

            if (!patient) {
                throw new HttpError(
                    "Patient not found",
                    "PATIENT_NOT_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }
            const patientCleaned: Partial<PatientResponse> =
                PatientDto.patientDTO(patient);
            return patientCleaned;
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );
            throw error;
        }
    }
}

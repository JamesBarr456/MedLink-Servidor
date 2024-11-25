import jwt from "jsonwebtoken";
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
import config from "../../config/enviroment.config";
import DoctorService from "../doctor/service";
import { IDoctor } from "../doctor/interface";
import DoctorDAO from "../doctor/dao";

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

    static async getPatientByEmail(
        email: string
    ): Promise<Partial<PatientResponse>> {
        try {
            const patientRepository = new PatientRepository(Patient);
            const patient = await patientRepository.getPatient({
                email: email,
            });
            console.log("🚀 ~ patient:", patient);
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

    static async authorizeDoctor(user: ITokenPayload, token: string) {
        try {
            const userDao = new UserDAO(Patient);
            const patientFound = await userDao.read(user.id);
            if (!patientFound) {
                throw new HttpError(
                    "User not found",
                    "USER_NOT_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }

            const decodedToken = jwt.verify(token, config.JWT_SECRET);
            const tokenData = JSON.stringify(decodedToken);

            const doctorId = JSON.parse(tokenData).doctorId;

            const doctorFound = await DoctorService.getDoctorById(doctorId);

            if (!doctorFound) {
                throw new HttpError(
                    "Doctor not found",
                    "DOCTOR_NOT_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }

            const patientDoctorsAuthorized = patientFound.authorizedDoctors.map(
                (authDoc) => authDoc.toString()
            );

            if (!doctorFound.id) {
                throw new HttpError(
                    "Doctor not found",
                    "DOCTOR_NOT_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }

            if (patientDoctorsAuthorized.includes(doctorFound.id)) {
                throw new HttpError(
                    "Doctor already authorized",
                    "DOCTOR_ALREADY_AUTHORIZED",
                    HTTP_STATUS.CONFLICT
                );
            }

            const patientPayload: Partial<IPatient> = {
                ...patientFound,
                authorizedDoctors: [
                    ...patientFound.authorizedDoctors.map(
                        (authorizeDoctor) => new Types.ObjectId(authorizeDoctor)
                    ),
                    new Types.ObjectId(doctorFound.id),
                ],
                updatedAt: new Date(),
            };

            const patientDao = new PatientDAO();

            const doctorPayload: Partial<IDoctor> = {
                ...doctorFound,
                patients: [
                    ...(doctorFound.patients
                        ? doctorFound.patients?.map(
                              (pat) => new Types.ObjectId(pat._id)
                          )
                        : []),
                    new Types.ObjectId(patientFound.id),
                ],
                updatedAt: new Date(),
                role: doctorFound.role as Roles,
            };

            const doctorDao = new DoctorDAO();

            const [updatedPatient, updatedDoctor] = await Promise.all([
                patientDao.update(patientFound._id.toString(), patientPayload),
                doctorDao.update(doctorFound.id, doctorPayload),
            ]);

            if (!updatedPatient) {
                throw new HttpError(
                    "User not updated",
                    "USER_NOT_UPDATED",
                    HTTP_STATUS.SERVER_ERROR
                );
            }

            if (!updatedDoctor) {
                throw new HttpError(
                    "Doctor not updated",
                    "DOCTOR_NOT_UPDATED",
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
}

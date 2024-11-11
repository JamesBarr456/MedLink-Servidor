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

  }

  static async getAllPatients(): Promise<PatientResponse[] | null> {
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

}

// LIBRARIES
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
// MODELS
import Patient from "./model";
// DAOS
import UserDAO from "../user/dao";
// DTOS
import PatientDto from "./dto";
// UTILS
import HttpError from "../../utils/HttpError.utils";
// CONSTANTS
import HTTP_STATUS from "../../constants/HttpStatus";
// INTERFACES
import {
  IPatient,
  PatientCreateFields,
  PatientResponse,
  PatientLoginFields,
} from "./interface";

export default class PatientService {
  static async createPatient(
    patient: PatientCreateFields
  ): Promise<PatientResponse> {
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

      const patientCreated: IPatient = await patientDao.create(patientPayload);

      if (!patientCreated) {
        throw new HttpError(
          "User not created",
          "USER_NOT_CREATED",
          HTTP_STATUS.SERVER_ERROR
        );
      }

      const userCleaned: PatientResponse =
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

  static async loginPatient(
    patient: PatientLoginFields
  ): Promise<{ token: string }> {
    try {
      const patientDao = new UserDAO(Patient);

      const patientFound = await patientDao.find({
        email: patient.email,
      });

      if (!patientFound || patientFound.length === 0) {
        throw new HttpError(
          "User not found",
          "USER_NOT_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }

      const user = patientFound[0];

      const isPasswordValid = await compare(patient.password, user.password!);
      if (!isPasswordValid) {
        throw new HttpError(
          "Invalid credentials",
          "INVALID_CREDENTIALS",
          HTTP_STATUS.UNAUTHORIZED
        );
      }

      const token = sign(
        {
          id: user._id,
          role: user.role,
          nbf: Math.floor(Date.now() / 1000),
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      return { token };
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

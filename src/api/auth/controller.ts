import { Request, Response } from "express";
import HTTP_STATUS from "../../constants/HttpStatus";
import apiResponse from "../../utils/apiResponse.utils";
import HttpError from "../../utils/HttpError.utils";
import { DoctorCreateFields, DoctorResponse } from "../doctor/interface";
import { PatientCreateFields, PatientResponse } from "../patient/interface";
import PatientService from "../patient/service";
import DoctorService from "../doctor/service";
import { UserLoginFields } from "../user/interface";
import UserService from "../user/service";

export default class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        // FIXME: Check if the requester is an admin, and admit only admins to create users with roles
        try {
            let userResponse: Partial<PatientResponse> | DoctorResponse;

            if (req.body.licenseNumber) {
                const doctorData: DoctorCreateFields = req.body;
                userResponse = await DoctorService.createDoctor(doctorData);
            } else {
                const patientData: PatientCreateFields = req.body;
                userResponse = await PatientService.createPatient(patientData);
            }

            const response = apiResponse(true, userResponse);
            res.status(HTTP_STATUS.CREATED).json(response);
        } catch (err: any) {
            // FIXME: Replace with a next function and a logger?
            const response = apiResponse(
                false,
                new HttpError(
                    err.description || err.message,
                    err.details || err.message,
                    err.status || HTTP_STATUS.SERVER_ERROR
                )
            );
            res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const userData: UserLoginFields = req.body;

            const token = await UserService.loginUser(userData);

            if (!token) {
                throw new HttpError(
                    "Invalid credentials",
                    "INVALID_CREDENTIALS",
                    HTTP_STATUS.UNAUTHORIZED
                );
            }

            const response = apiResponse(true, token);
            res.status(HTTP_STATUS.OK).json(response);
        } catch (err: any) {
            const response = apiResponse(
                false,
                new HttpError(
                    err.description || err.message,
                    err.details || err.message,
                    err.status || HTTP_STATUS.SERVER_ERROR
                )
            );
            res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
        }
    }

    static async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            const generatedResponse =
                await UserService.generetePasswordResetToken(email);

            const response = apiResponse(true, generatedResponse);

            res.status(HTTP_STATUS.OK).json(response);
        } catch (err: any) {
            const response = apiResponse(
                false,
                new HttpError(
                    err.description || err.message,
                    err.details || err.message,
                    err.status || HTTP_STATUS.SERVER_ERROR
                )
            );
            res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
        }
    }

    static async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { token } = req.params;
            const { password } = req.body;

            const passwordRestored = await UserService.resetPassword(
                token,
                password
            );

            const response = apiResponse(true, passwordRestored);
            res.status(HTTP_STATUS.OK).json(response);
        } catch (err: any) {
            const response = apiResponse(
                false,
                new HttpError(
                    err.description || err.message,
                    err.details || err.message,
                    err.status || HTTP_STATUS.SERVER_ERROR
                )
            );
            res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
        }
    }
}

import { Request, Response } from "express";
import { PatientCreateFields, PatientLoginFields, PatientResponse } from "./interface";
import { MulterFiles } from "../../interfaces/file.interface";
import apiResponse from "../../utils/apiResponse.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import PatientService from "./service";


export default class patientController {
    static async register(req: Request, res: Response): Promise<void> {
        // FIXME: Check if the requester is an admin, and admit only admins to create users with roles
        try {
            const patientData: PatientCreateFields = req.body;
            const files = req.files as MulterFiles;
            if (files && files["profile"] && files["profile"][0]) {
                patientData.avatarUrl =
                    files.profile[0].path.split("public")[1];
            }

            const patient: PatientResponse = await PatientService.createPatient(
                patientData
            );

            const response = apiResponse(true, patient);
            res.status(HTTP_STATUS.CREATED).json(response);
        } catch (err: any) {
            // FIXME: Replace with a next function and a logger
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
            const patientData : PatientLoginFields = req.body;

            const token = await PatientService.loginPatient(patientData);

            if (!token) {
                throw new HttpError(
                    "Invalid credentials",
                    "INVALID_CREDENTIALS",
                    HTTP_STATUS.UNAUTHORIZED
                );
            }

            const response = apiResponse(true, token);
            res.status(HTTP_STATUS.OK).json(response);
        } catch (err : any) {
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

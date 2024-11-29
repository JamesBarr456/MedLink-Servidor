import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import PatientService from "./service";
import { PatientUpdateFields } from "./interface";
import { MulterFiles } from "../../interfaces/file.interface";
import cloudinaryUploader from "../../config/cloudinary.config";

export default class PatientController {
    static async getPatient(req: Request, res: Response) {
        try {
            const { user } = res.locals;
            const patientId = req.params.id;
            const patient = await PatientService.getPatientById(
                patientId,
                user
            );

            const response = apiResponse(true, patient);
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

    static async update(req: Request, res: Response) {
        try {
            const { user } = res.locals;
            const { ...updateFields }: Partial<PatientUpdateFields> = req.body;

            const files = req.files as MulterFiles;

            if (files && files.avatar) {
                const avatarURL = await cloudinaryUploader(
                    files.avatar[0].path
                );
                updateFields.avatar = avatarURL.secure_url;
            }

            const updatedUser = await PatientService.updatePatient(
                user,
                updateFields
            );

            const response = apiResponse(true, updatedUser);
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

    static async authorizeDoctor(req: Request, res: Response) {
        try {
            const { user } = res.locals;
            const { token } = req.params;

            const updatedUser = await PatientService.authorizeDoctor(
                user,
                token
            );

            const response = apiResponse(true, updatedUser);
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

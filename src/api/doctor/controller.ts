import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import DoctorService from "./service";
import { MulterFiles } from "../../interfaces/file.interface";

export default class DoctorController {
    static async getDoctor(req: Request, res: Response) {
        try {
            const doctorId = req.params.id;
            const doctor = await DoctorService.getDoctorById(doctorId);

            const response = apiResponse(true, doctor);
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
            const { ...updateFields } = req.body;

            const files = req.files as MulterFiles;

            if (files && files.avatar) {
                updateFields.avatar = `/uploads/avatars/${files.avatar[0].filename}`;
            }

            const updatedDoctor = await DoctorService.updateDoctor(
                user,
                updateFields
            );

            const response = apiResponse(true, updatedDoctor);
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

    static async requestAccess(req: Request, res: Response) {
        try {
            const { user } = res.locals;
            const { email } = req.body;

            const request = await DoctorService.requestAccess(user, email);

            const response = apiResponse(true, request);
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

    static async updateClinics(req: Request, res: Response) {
        try {
            const { user } = res.locals;
            const clinics = req.body;

            const doctorUpdated = await DoctorService.updateClinics(
                user,
                clinics
            );

            const response = apiResponse(true, doctorUpdated);
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

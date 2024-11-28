import { Request, Response } from "express";

import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import DoctorService from "../doctor/service";
import PatientService from "../patient/service";
import apiResponse from "../../utils/apiResponse.utils";
import { DoctorCreateFields, DoctorResponse } from "../doctor/interface";

export default class AdminController {
    static async getAllDoctors(_req: Request, res: Response): Promise<void> {
        try {
            const doctors = await DoctorService.getAllDoctors();
            const response = apiResponse(true, doctors);
            res.status(HTTP_STATUS.CREATED).json(response);
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

    static async getAllPatients(_req: Request, res: Response): Promise<void> {
        try {
            const patients = await PatientService.getAllPatients();
            const response = apiResponse(true, patients);
            res.status(HTTP_STATUS.CREATED).json(response);
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
    static async createDoctor(req: Request, res: Response): Promise<void> {
        try {
            const doctorData: DoctorCreateFields = req.body;
            const doctorResponse: DoctorResponse =
                await DoctorService.createDoctor(doctorData);
            const response = apiResponse(true, doctorResponse);
            res.status(HTTP_STATUS.CREATED).json(response);
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

    // static async deleteDoctor(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { id } = req.params;

    //         if (!mongoose.Types.ObjectId.isValid(id)) {
    //             throw new HttpError(
    //                 "Invalid doctor ID format",
    //                 "INVALID_DOCTOR_ID",
    //                 HTTP_STATUS.BAD_REQUEST
    //             );
    //         }

    //         await DoctorService.deleteDoctor(id);

    //         const response = apiResponse(true, { message: "Doctor successfully deleted"});
    //         res.status(HTTP_STATUS.OK).json(response);
    //     } catch (err: any) {
    //         const response = apiResponse(
    //             false,
    //             new HttpError(
    //                 err.description || err.message,
    //                 err.details || err.message,
    //                 err.status || HTTP_STATUS.SERVER_ERROR
    //             )
    //         );
    //         res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
    //     }
    // }
}

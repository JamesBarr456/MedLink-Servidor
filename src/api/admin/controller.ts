import { Request, Response } from "express";

import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import DoctorService from "../doctor/service";
import PatientService from "../patient/service";
import apiResponse from "../../utils/apiResponse.utils";

export default class AdminController {
    static async getAllDoctors(req: Request, res: Response): Promise<void> {
        try {
            const doctors = await DoctorService.getAllDoctors();
            const response = apiResponse(true, doctors);
            res.status(HTTP_STATUS.CREATED).json(response);
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

    static async getAllPatients(req: Request, res: Response): Promise<void> {
        try {
            const patients = await PatientService.getAllPatients();
            const response = apiResponse(true, patients);
            res.status(HTTP_STATUS.CREATED).json(response);
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
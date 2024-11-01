import { Request, Response } from "express";
import HTTP_STATUS from "../../constants/HttpStatus";
import { MulterFiles } from "../../interfaces/file.interface";
import apiResponse from "../../utils/apiResponse.utils";
import HttpError from "../../utils/HttpError.utils";
import { DoctorCreateFields } from "../doctor/interface";
import { PatientCreateFields, PatientResponse } from "../patient/interface";
import PatientService from "../patient/service";

export default class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        // FIXME: Check if the requester is an admin, and admit only admins to create users with roles
        try {
            const userResponse: PatientResponse | DoctorResponse;

            if (req.body.rofessionalregistration) {
                const doctorData: DoctorCreateFields = req.body;
                const userResponse: DoctorResponse =
                    await DoctorService.createDoctor(doctorData);
            } else {
                const patientData: PatientCreateFields = req.body;
                const userResponse: PatientResponse =
                    await PatientService.createPatient(patientData);
            }

            const response = apiResponse(true, userResponse);
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
}

import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse.utils";
import HttpError from "../../utils/HttpError.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import PatientMedicationsService from "./service";

export default class PatientMedicationsController {
    static async add(req: Request, res: Response) {
        try {
            const { user } = res.locals;
            const { ...Fields } = req.body;

            const patientUpdated =
                await PatientMedicationsService.createOrUpdatePatientMedications(
                    user,
                    Fields
                );

            const response = apiResponse(true, patientUpdated);
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

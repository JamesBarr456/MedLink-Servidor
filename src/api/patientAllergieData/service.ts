import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import { PatientResponse } from "../patient/interface";
import IPatientAllergieData from "./interfaces";
import PatientAllergieDataDAO from "./dao";
import PatientService from "../patient/service";
import { ITokenPayload } from "../auth/interface";
import { PatientFields } from "../../constants/PatientFields";
import { Types } from "mongoose";

export default class PatientAllergieDataService {
    static async createOrUpdatePatientAllergieData(
        user: ITokenPayload,
        fields: Partial<IPatientAllergieData>
    ): Promise<Partial<PatientResponse>> {
        try {
            const patientAllergiePayload = {
                patientId: user.id,
                ...fields,
            };
            const patientAllergieDataSaved =
                await PatientAllergieDataDAO.createOrUpdate(
                    patientAllergiePayload as Partial<IPatientAllergieData>
                );
            const patientUpdated = await PatientService.addMedicalInformation(
                user,
                patientAllergieDataSaved._id as Types.ObjectId,
                PatientFields.ALLERGIES_DATA
            );
            return patientUpdated;
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

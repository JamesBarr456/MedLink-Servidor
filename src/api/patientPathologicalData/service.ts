import { Types } from "mongoose";
import HTTP_STATUS from "../../constants/HttpStatus";
import { PatientFields } from "../../constants/PatientFields";
import HttpError from "../../utils/HttpError.utils";
import { ITokenPayload } from "../auth/interface";
import PatientService from "../patient/service";
import PatientPathologicalDataDAO from "./dao";
import IPatientPathologicalData from "./interface";

export default class PatientPathologicalDataService {
    static async createOrUpdatePatientPathologicalData(
        user: ITokenPayload,
        fields: Partial<IPatientPathologicalData>
    ) {
        try {
            const patientPathologicalPayload = {
                patientId: user.id,
                ...fields,
            };
            const patientPathologicalDataSaved =
                await PatientPathologicalDataDAO.createOrUpdate(
                    patientPathologicalPayload as Partial<IPatientPathologicalData>
                );

            const patientUpdated = await PatientService.addMedicalInformation(
                user,
                patientPathologicalDataSaved._id as Types.ObjectId,
                PatientFields.PATHOLOGICAL_DATA
            );
            return patientUpdated;
        } catch (err: any) {
            const error = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );
            throw error;
        }
    }
}

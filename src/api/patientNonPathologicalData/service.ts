import { Types } from "mongoose";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import { ITokenPayload } from "../auth/interface";
import { PatientResponse } from "../patient/interface";
import PatientService from "../patient/service";
import PatientNonPathologicalDataDAO from "./dao";
import IPatientNonPathologicalData from "./interface";
import { PatientFields } from "../../constants/PatientFields";

export default class PatientNonPathologicalDataService {
    static async createOrUpdatePatientNonPathologicalData(
        user: ITokenPayload,
        fields: Partial<IPatientNonPathologicalData>
    ): Promise<Partial<PatientResponse>> {
        try {
            const patientNonPathologicalPayload = {
                patientId: user.id,
                ...fields,
            };

            const patientNonPathologicalDataSaved =
                await PatientNonPathologicalDataDAO.createOrUpdate(
                    patientNonPathologicalPayload as Partial<IPatientNonPathologicalData>
                );
            const patientUpdated = await PatientService.addMedicalInformation(
                user,
                patientNonPathologicalDataSaved._id as Types.ObjectId,
                PatientFields.NON_PATHOLOGICAL_DATA
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

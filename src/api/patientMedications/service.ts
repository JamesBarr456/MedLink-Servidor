import { Types } from "mongoose";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import { ITokenPayload } from "../auth/interface";
import { PatientResponse } from "../patient/interface";
import PatientService from "../patient/service";
import PatientMedicationsDAO from "./dao";
import IPatientMedication from "./interface";
import { PatientFields } from "../../constants/PatientFields";

export default class PatientMedicationsService {
    static async createOrUpdatePatientMedications(
        user: ITokenPayload,
        Fields: Partial<IPatientMedication>
    ): Promise<Partial<PatientResponse>> {
        try {
            const patientMedicationPayload = {
                patientId: user.id,
                ...Fields,
            };

            const patientMedicationDataSaved =
                await PatientMedicationsDAO.createOrUpdate(
                    patientMedicationPayload as Partial<IPatientMedication>
                );

            const patientUpdate = await PatientService.addMedicalInformation(
                user,
                patientMedicationDataSaved._id as Types.ObjectId,
                PatientFields.MEDICATIONS_DATA
            );

            return patientUpdate;
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

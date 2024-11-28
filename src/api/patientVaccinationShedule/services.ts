import { Types } from "mongoose";
import { PatientFields } from "../../constants/PatientFields";
import { ITokenPayload } from "../auth/interface";
import { PatientResponse } from "../patient/interface";
import PatientService from "../patient/service";
import IPatientVaccinationShedule from "./interface";
import PatientVaccinationSheduleDAO from "./dao";
import HttpError from "../../utils/HttpError.utils";
import HTTP_STATUS from "../../constants/HttpStatus";

export default class PatientVaccinationSheduleService {
    static async createOrUpdatePatientVaccinationShedule(
        user: ITokenPayload,
        fields: Partial<IPatientVaccinationShedule>
    ): Promise<Partial<PatientResponse>> {
        try {
            const PatientVaccinationShedulePayload = {
                patientId: user.id,
                ...fields,
            };

            const patientVaccinationSheduleSaved =
                await PatientVaccinationSheduleDAO.createOrUpdate(
                    PatientVaccinationShedulePayload as Partial<IPatientVaccinationShedule>
                );

            const patientUpdated = await PatientService.addMedicalInformation(
                user,
                patientVaccinationSheduleSaved._id as Types.ObjectId,
                PatientFields.VACCINATION_SHEDULE
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

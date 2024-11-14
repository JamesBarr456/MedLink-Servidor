import { Types } from "mongoose";
import HTTP_STATUS from "../../constants/HttpStatus";
import { PatientFields } from "../../constants/PatientFields";
import HttpError from "../../utils/HttpError.utils";
import { ITokenPayload } from "../auth/interface";
import IPatientFamilyInheritance from "./interface";
import PatientService from "../patient/service";
import PatientFamilyInheritanceDAO from "./dao";

export default class PatientFamilyInheritanceService {
    static async createOrUpdatePatientAllergieData(
        user: ITokenPayload,
        Fields: Partial<IPatientFamilyInheritance>
    ) {
        try {
            const PatientFamilyInheritancePayload = {
                patientId: user.id,
                ...Fields,
            };

            const patientFamilyInheritanceDataSaved =
                await PatientFamilyInheritanceDAO.createOrUpdate(
                    PatientFamilyInheritancePayload as Partial<IPatientFamilyInheritance>
                );

            const patientUpdated = await PatientService.addMedicalInformation(
                user,
                patientFamilyInheritanceDataSaved._id as Types.ObjectId,
                PatientFields.FAMILY_INHERITANCE_DATA
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

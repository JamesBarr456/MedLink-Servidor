import { Types } from "mongoose";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import PatientClinicalDataDAO from "./dao";
import IPatientClinicalData from "./interface";
import { PatientUpdateFields } from "../patient/interface";
import PatientClinicalData from "./model";
import PatientClinicalDataDto from "./dto";

export default class PatientClinicalDataService {
    static async createClinicalData(
        updateFields: Partial<PatientUpdateFields>,
        patientId: Types.ObjectId
    ): Promise<Partial<IPatientClinicalData>> {
        try {
            const patientClinicalDataPayload: IPatientClinicalData =
                new PatientClinicalData({
                    ...(updateFields.height && {
                        height: updateFields.height,
                    }),
                    ...(updateFields.weight && {
                        weight: updateFields.weight,
                    }),
                    ...(updateFields.bloodType && {
                        bloodType: updateFields.bloodType,
                    }),
                    ...(updateFields.bloodPressureTrend && {
                        bloodPressureTrend: updateFields.bloodPressureTrend,
                    }),
                    ...(updateFields.isDonor && {
                        isDonor: updateFields.isDonor,
                    }),
                    ...(updateFields.hasAllergies && {
                        hasAllergies: updateFields.hasAllergies,
                    }),
                    ...(updateFields.hasChronicDiseases && {
                        hasChronicDiseases: updateFields.hasChronicDiseases,
                    }),
                    ...(updateFields.hasHealthyLifestyle && {
                        hasHealthyLifestyle: updateFields.hasHealthyLifestyle,
                    }),
                    patientId,
                });

            const createdClinicalData = await PatientClinicalDataDAO.create(
                patientClinicalDataPayload
            );

            return createdClinicalData;
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

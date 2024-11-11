import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import UserDAO from "../user/dao";
import DoctorDto from "./dto";
//ROLES
import { Roles } from "../../constants/Roles";

import { DoctorCreateFields, DoctorResponse, IDoctor } from "./interface";
import Doctor from "./model";

export default class DoctorService {
    static async createDoctor(
        doctorData: DoctorCreateFields
    ): Promise<DoctorResponse> {
        try {
            const doctorDao = new UserDAO(Doctor);
            const doctorFound = await doctorDao.find({
                $or: [
                    { email: doctorData.email },
                    {
                        licenseNumber: doctorData.licenseNumber,
                    },
                ],
            });

            if (doctorFound && doctorFound.length > 0) {
                throw new HttpError(
                    "User already exists",
                    "USER_ALREADY_EXISTS",
                    HTTP_STATUS.CONFLICT
                );
            }

            const doctorPayload: IDoctor = new Doctor({
                ...doctorData,

                createdAt: new Date(),
            });

            const doctorCreated: IDoctor = await doctorDao.create(
                doctorPayload
            );

            if (!doctorCreated) {
                throw new HttpError(
                    "User not created",
                    "USER_NOT_CREATED",
                    HTTP_STATUS.SERVER_ERROR
                );
            }

            const userCleaned: DoctorResponse =
                DoctorDto.doctorDTO(doctorCreated);

            return userCleaned;
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );

            throw error;
        }
    }
    static async getAllDoctors(): Promise<DoctorResponse[] | null> {
        try {
          const doctorDao = new UserDAO(Doctor);
          const doctors = await doctorDao.find({ role: Roles.DOCTOR });
    
    
          if (!doctors || doctors.length === 0) {
            throw new HttpError(
                "No doctors found",
                "NO_DOCTORS_FOUND",
                HTTP_STATUS.NOT_FOUND
            );
          }
          const doctorsReponse = DoctorDto.doctorsArrayDTO(doctors);
          return doctorsReponse;
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

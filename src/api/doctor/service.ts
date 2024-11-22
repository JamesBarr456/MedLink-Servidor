import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import UserDAO from "../user/dao";
import DoctorDto from "./dto";
//ROLES
import { Roles } from "../../constants/Roles";

import { DoctorCreateFields, DoctorResponse, IDoctor } from "./interface";
import Doctor from "./model";
import Patient from "../patient/model";
import DoctorDAO from "./dao";

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
    static async deleteDoctor(doctorId: string): Promise<void> {
        try {
            const doctorDao = new UserDAO(Doctor);

            const doctorFound = await doctorDao.read(doctorId);
            if (!doctorFound) {
                throw new HttpError(
                    "Doctor not found",
                    "DOCTOR_NOT_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }

            if (doctorFound.patients && doctorFound.patients.length > 0) {
                const patientDao = new UserDAO(Patient);
                for (const patientId of doctorFound.patients) {
                    //FIXED Se elimina la relacion con el paciente?
                    //await patientDao.update(patientId.toString(), { doctor: null });
                }
            }

            // if (
            //     doctorFound.consultations &&
            //     doctorFound.consultations.length > 0
            // ) {
            //     doctorFound.consultations.forEach(async (consultation) => {
            //         await doctorDao.delete(
            //             consultation.consultationId.toString()
            //         );
            //     });
            // }

            const deletedDoctor = await doctorDao.delete(doctorId);
            if (!deletedDoctor) {
                throw new HttpError(
                    "Doctor not deleted",
                    "DOCTOR_NOT_DELETED",
                    HTTP_STATUS.SERVER_ERROR
                );
            }
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );
            throw error;
        }
    }
    static async getDoctorById(id: string): Promise<Partial<DoctorResponse>> {
        try {
            const doctorDao = new DoctorDAO();
            const doctor = await doctorDao.read(id);

            if (!doctor) {
                throw new HttpError(
                    "Doctor not found",
                    "DOCTOR_NOT_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }

            const doctorResponse = DoctorDto.doctorDTO(doctor);

            return doctorResponse;
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

import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import UserDAO from "../user/dao";
import DoctorDto from "./dto";
//ROLES
import { Roles } from "../../constants/Roles";

import {
    DoctorCreateFields,
    DoctorResponse,
    DoctorUpdateFields,
    IDoctor,
} from "./interface";
import Doctor from "./model";
import Patient from "../patient/model";
import DoctorDAO from "./dao";
import { ITokenPayload } from "../auth/interface";
import { SPECIALITIES } from "../../constants/Specializations";
import PatientService from "../patient/service";
import { sign } from "jsonwebtoken";
import config from "../../config/enviroment.config";
import MailSender from "../../utils/mailSender.utils";
import { IClinic } from "../clinic/interface";
import PatientClinicalDataDAO from "../patientClinicalData/dao";
import ClinicDAO from "../clinic/dao";
import { literal } from "zod";
import { Types } from "mongoose";

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

    static async updateDoctor(
        user: ITokenPayload,
        updateFields: Partial<DoctorUpdateFields>
    ): Promise<Partial<DoctorResponse>> {
        try {
            const doctorDao = new DoctorDAO();
            const doctorFound = await doctorDao.read(user.id);
            if (!doctorFound) {
                throw new HttpError(
                    "Doctor not found",
                    "DOCTOR_NOT_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }

            if (
                updateFields.specialization &&
                typeof updateFields.specialization === "string"
            ) {
                const specilities = updateFields.specialization
                    .split(",")
                    .map((spec) => spec.trim());

                updateFields.skills = specilities;
            }

            const doctorPayload: Partial<IDoctor> = {
                ...doctorFound,
                ...updateFields,
                specialization: updateFields.specialization as SPECIALITIES[],
                aboutMe: updateFields.about_me,
                updatedAt: new Date(),
            };
            const updatedDoctor = await doctorDao.update(
                user.id,
                doctorPayload
            );
            if (!updatedDoctor) {
                throw new HttpError(
                    "Doctor not updated",
                    "DOCTOR_NOT_UPDATED",
                    HTTP_STATUS.SERVER_ERROR
                );
            }

            const doctorResponse = DoctorDto.doctorDTO(updatedDoctor);

            return doctorResponse;
        } catch (error: any) {
            const err: HttpError = new HttpError(
                error.description || error.message,
                error.details || error.message,
                error.status || HTTP_STATUS.SERVER_ERROR
            );
            throw err;
        }
    }

    static async requestAccess(
        user: ITokenPayload,
        email: string
    ): Promise<{
        message: string;
    }> {
        try {
            const doctorDao = new DoctorDAO();
            const doctorFound = await doctorDao.readAndPopulate(user.id);

            if (!doctorFound) {
                throw new HttpError(
                    "Doctor don't found",
                    "DOCTOR_DONT_FOUND",
                    HTTP_STATUS.BAD_REQUEST
                );
            }

            const patientExists = doctorFound.patients.some((patient) => {
                return patient.email === email;
            });

            if (patientExists) {
                throw new HttpError(
                    "Patient already associated with this doctor",
                    "PATIENT_ALREADY_ASSOCIATED",
                    HTTP_STATUS.CONFLICT
                );
            }

            const patient = await PatientService.getPatientByEmail(email);

            const tokenPayload = {
                doctorId: user.id,
                patientId: patient._id,
            };

            const token = sign(tokenPayload, config.JWT_SECRET, {
                expiresIn: "24h",
            });

            const responseAccsessLink = `${config.FRONTEND_URL}/response-access/${token}`;

            const emailPayload = {
                to: patient.email ?? "",
                subject: "Dar acceso a tu perfil.",
                html: `El Doctor ${doctorFound.firstName} ${doctorFound.lastName} - MP.: ${doctorFound.licenseNumber}, está solicitando acceso para ver tu perfil.\n Para aceptar o rechazar, ingresa al siguiente enlace: <a href=${responseAccsessLink}>Contestar solicitud.</a>`,
            };

            const emailSender = new MailSender(
                emailPayload.to,
                emailPayload.subject,
                emailPayload.html
            );

            const emailresult = await emailSender.sendMail();

            if (!emailresult) {
                throw new HttpError(
                    "Error sending email",
                    "ERROR_SENDING_EMAIL",
                    HTTP_STATUS.SERVER_ERROR
                );
            }

            return {
                message: "Token generated successfully and email sent",
            };
        } catch (error: any) {
            const err: HttpError = new HttpError(
                error.description || error.message,
                error.details || error.message,
                error.status || HTTP_STATUS.SERVER_ERROR
            );
            throw err;
        }
    }

    static async updateClinics(
        user: ITokenPayload,
        clinic: IClinic
    ): Promise<Partial<DoctorResponse>> {
        try {
            const doctorDao = new DoctorDAO();
            const doctorFound = await doctorDao.readAndPopulate(user.id);

            if (!doctorFound) {
                throw new HttpError(
                    "Doctor don't found",
                    "DOCTOR_DONT_FOUND",
                    HTTP_STATUS.BAD_REQUEST
                );
            }

            const clinicDao = new ClinicDAO();
            let clinicFound = await clinicDao.findByName(
                clinic.name.toUpperCase()
            );

            if (!clinicFound) {
                const clinicPlayload: Partial<IClinic> = {
                    ...clinic,
                    name: clinic.name.toUpperCase(),
                };

                clinicFound = await clinicDao.create(clinicPlayload);
            }

            const doctorPayload: Partial<IDoctor> = {
                ...doctorFound,
                patients: [
                    ...doctorFound.patients.map(
                        (patient) => patient._id as Types.ObjectId
                    ),
                ],
                clinics: [
                    ...(doctorFound.clinics
                        ? doctorFound.clinics.map(
                              (clinic) => clinic._id as Types.ObjectId
                          )
                        : []),
                    clinicFound._id as Types.ObjectId,
                ],
                updatedAt: new Date(),
            };

            const updatedDoctor = await doctorDao.update(
                user.id,
                doctorPayload
            );
            if (!updatedDoctor) {
                throw new HttpError(
                    "Doctor not updated",
                    "DOCTOR_NOT_UPDATED",
                    HTTP_STATUS.SERVER_ERROR
                );
            }

            const doctorResponse = DoctorDto.doctorDTO(updatedDoctor);

            return doctorResponse;
        } catch (error: any) {
            const err: HttpError = new HttpError(
                error.description || error.message,
                error.details || error.message,
                error.status || HTTP_STATUS.SERVER_ERROR
            );
            throw err;
        }
    }
}

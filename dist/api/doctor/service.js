"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus_1 = __importDefault(require("../../constants/HttpStatus"));
const HttpError_utils_1 = __importDefault(require("../../utils/HttpError.utils"));
const dao_1 = __importDefault(require("../user/dao"));
const dto_1 = __importDefault(require("./dto"));
//ROLES
const Roles_1 = require("../../constants/Roles");
const model_1 = __importDefault(require("./model"));
const dao_2 = __importDefault(require("./dao"));
const service_1 = __importDefault(require("../patient/service"));
const jsonwebtoken_1 = require("jsonwebtoken");
const enviroment_config_1 = __importDefault(require("../../config/enviroment.config"));
const mailSender_utils_1 = __importDefault(require("../../utils/mailSender.utils"));
const dao_3 = __importDefault(require("../clinic/dao"));
class DoctorService {
    static createDoctor(doctorData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctorDao = new dao_1.default(model_1.default);
                const doctorFound = yield doctorDao.find({
                    $or: [
                        { email: doctorData.email },
                        {
                            licenseNumber: doctorData.licenseNumber,
                        },
                    ],
                });
                if (doctorFound && doctorFound.length > 0) {
                    throw new HttpError_utils_1.default("User already exists", "USER_ALREADY_EXISTS", HttpStatus_1.default.CONFLICT);
                }
                const doctorPayload = new model_1.default(Object.assign(Object.assign({}, doctorData), { createdAt: new Date() }));
                const doctorCreated = yield doctorDao.create(doctorPayload);
                if (!doctorCreated) {
                    throw new HttpError_utils_1.default("User not created", "USER_NOT_CREATED", HttpStatus_1.default.SERVER_ERROR);
                }
                const userCleaned = dto_1.default.doctorDTO(doctorCreated);
                return userCleaned;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
    static getAllDoctors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctorDao = new dao_1.default(model_1.default);
                const doctors = yield doctorDao.find({ role: Roles_1.Roles.DOCTOR });
                if (!doctors || doctors.length === 0) {
                    throw new HttpError_utils_1.default("No doctors found", "NO_DOCTORS_FOUND", HttpStatus_1.default.NOT_FOUND);
                }
                const doctorsReponse = dto_1.default.doctorsArrayDTO(doctors);
                return doctorsReponse;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
    // static async deleteDoctor(doctorId: string): Promise<void> {
    //     try {
    //         const doctorDao = new UserDAO(Doctor);
    //         const doctorFound = await doctorDao.read(doctorId);
    //         if (!doctorFound) {
    //             throw new HttpError(
    //                 "Doctor not found",
    //                 "DOCTOR_NOT_FOUND",
    //                 HTTP_STATUS.NOT_FOUND
    //             );
    //         }
    //         if (doctorFound.patients && doctorFound.patients.length > 0) {
    //             const patientDao = new UserDAO(Patient);
    //             for (const patientId of doctorFound.patients) {
    //                 //FIXED Se elimina la relacion con el paciente?
    //                 //await patientDao.update(patientId.toString(), { doctor: null });
    //             }
    //         }
    //         // if (
    //         //     doctorFound.consultations &&
    //         //     doctorFound.consultations.length > 0
    //         // ) {
    //         //     doctorFound.consultations.forEach(async (consultation) => {
    //         //         await doctorDao.delete(
    //         //             consultation.consultationId.toString()
    //         //         );
    //         //     });
    //         // }
    //         const deletedDoctor = await doctorDao.delete(doctorId);
    //         if (!deletedDoctor) {
    //             throw new HttpError(
    //                 "Doctor not deleted",
    //                 "DOCTOR_NOT_DELETED",
    //                 HTTP_STATUS.SERVER_ERROR
    //             );
    //         }
    //     } catch (err: any) {
    //         const error: HttpError = new HttpError(
    //             err.description || err.message,
    //             err.details || err.message,
    //             err.status || HTTP_STATUS.SERVER_ERROR
    //         );
    //         throw error;
    //     }
    // }
    static getDoctorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctorDao = new dao_2.default();
                const doctor = yield doctorDao.read(id);
                if (!doctor) {
                    throw new HttpError_utils_1.default("Doctor not found", "DOCTOR_NOT_FOUND", HttpStatus_1.default.NOT_FOUND);
                }
                const doctorResponse = dto_1.default.doctorDTO(doctor);
                return doctorResponse;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
    static updateDoctor(user, updateFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctorDao = new dao_2.default();
                const doctorFound = yield doctorDao.read(user.id);
                if (!doctorFound) {
                    throw new HttpError_utils_1.default("Doctor not found", "DOCTOR_NOT_FOUND", HttpStatus_1.default.NOT_FOUND);
                }
                if (updateFields.specialization &&
                    typeof updateFields.specialization === "string") {
                    const specilities = updateFields.specialization
                        .split(",")
                        .map((spec) => spec.trim());
                    updateFields.skills = specilities;
                }
                const doctorPayload = Object.assign(Object.assign(Object.assign({}, doctorFound), updateFields), { specialization: updateFields.specialization, aboutMe: updateFields.about_me, updatedAt: new Date() });
                const updatedDoctor = yield doctorDao.update(user.id, doctorPayload);
                if (!updatedDoctor) {
                    throw new HttpError_utils_1.default("Doctor not updated", "DOCTOR_NOT_UPDATED", HttpStatus_1.default.SERVER_ERROR);
                }
                const doctorResponse = dto_1.default.doctorDTO(updatedDoctor);
                return doctorResponse;
            }
            catch (error) {
                const err = new HttpError_utils_1.default(error.description || error.message, error.details || error.message, error.status || HttpStatus_1.default.SERVER_ERROR);
                throw err;
            }
        });
    }
    static requestAccess(user, email) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const doctorDao = new dao_2.default();
                const doctorFound = yield doctorDao.readAndPopulate(user.id);
                if (!doctorFound) {
                    throw new HttpError_utils_1.default("Doctor don't found", "DOCTOR_DONT_FOUND", HttpStatus_1.default.BAD_REQUEST);
                }
                const patientExists = doctorFound.patients.some((patient) => {
                    return patient.email === email;
                });
                if (patientExists) {
                    throw new HttpError_utils_1.default("Patient already associated with this doctor", "PATIENT_ALREADY_ASSOCIATED", HttpStatus_1.default.CONFLICT);
                }
                const patient = yield service_1.default.getPatientByEmail(email);
                const tokenPayload = {
                    doctorId: user.id,
                    patientId: patient._id,
                };
                const token = (0, jsonwebtoken_1.sign)(tokenPayload, enviroment_config_1.default.JWT_SECRET, {
                    expiresIn: "24h",
                });
                const responseAccsessLink = `${enviroment_config_1.default.FRONTEND_URL}/response-access/${token}`;
                const emailPayload = {
                    to: (_a = patient.email) !== null && _a !== void 0 ? _a : "",
                    subject: "Dar acceso a tu perfil.",
                    html: `El Doctor ${doctorFound.firstName} ${doctorFound.lastName} - MP.: ${doctorFound.licenseNumber}, está solicitando acceso para ver tu perfil.\n Para aceptar o rechazar, ingresa al siguiente enlace: <a href=${responseAccsessLink}>Contestar solicitud.</a>`,
                };
                const emailSender = new mailSender_utils_1.default(emailPayload.to, emailPayload.subject, emailPayload.html);
                const emailresult = yield emailSender.sendMail();
                if (!emailresult) {
                    throw new HttpError_utils_1.default("Error sending email", "ERROR_SENDING_EMAIL", HttpStatus_1.default.SERVER_ERROR);
                }
                return {
                    message: "Token generated successfully and email sent",
                };
            }
            catch (error) {
                const err = new HttpError_utils_1.default(error.description || error.message, error.details || error.message, error.status || HttpStatus_1.default.SERVER_ERROR);
                throw err;
            }
        });
    }
    static updateClinics(user, clinic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctorDao = new dao_2.default();
                const doctorFound = yield doctorDao.readAndPopulate(user.id);
                if (!doctorFound) {
                    throw new HttpError_utils_1.default("Doctor don't found", "DOCTOR_DONT_FOUND", HttpStatus_1.default.BAD_REQUEST);
                }
                const clinicDao = new dao_3.default();
                let clinicFound = yield clinicDao.findByName(clinic.name.toUpperCase());
                if (!clinicFound) {
                    const clinicPlayload = Object.assign(Object.assign({}, clinic), { name: clinic.name.toUpperCase() });
                    clinicFound = yield clinicDao.create(clinicPlayload);
                }
                const doctorPayload = Object.assign(Object.assign({}, doctorFound), { patients: [
                        ...doctorFound.patients.map((patient) => patient._id),
                    ], clinics: [
                        ...(doctorFound.clinics
                            ? doctorFound.clinics.map((clinic) => clinic._id)
                            : []),
                        clinicFound._id,
                    ], updatedAt: new Date() });
                const updatedDoctor = yield doctorDao.update(user.id, doctorPayload);
                if (!updatedDoctor) {
                    throw new HttpError_utils_1.default("Doctor not updated", "DOCTOR_NOT_UPDATED", HttpStatus_1.default.SERVER_ERROR);
                }
                const doctorResponse = dto_1.default.doctorDTO(updatedDoctor);
                return doctorResponse;
            }
            catch (error) {
                const err = new HttpError_utils_1.default(error.description || error.message, error.details || error.message, error.status || HttpStatus_1.default.SERVER_ERROR);
                throw err;
            }
        });
    }
}
exports.default = DoctorService;

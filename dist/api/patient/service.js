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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// MODELS
const model_1 = __importDefault(require("./model"));
// DAOS
const dao_1 = __importDefault(require("../user/dao"));
// DTOS
const dto_1 = __importDefault(require("./dto"));
// UTILS
const HttpError_utils_1 = __importDefault(require("../../utils/HttpError.utils"));
//ROLES
const Roles_1 = require("../../constants/Roles");
// CONSTANTS
const HttpStatus_1 = __importDefault(require("../../constants/HttpStatus"));
const dao_2 = __importDefault(require("./dao"));
const mongoose_1 = require("mongoose");
const services_1 = __importDefault(require("../patientClinicalData/services"));
const PatientFields_1 = require("../../constants/PatientFields");
const repository_1 = __importDefault(require("./repository"));
const enviroment_config_1 = __importDefault(require("../../config/enviroment.config"));
const service_1 = __importDefault(require("../doctor/service"));
const dao_3 = __importDefault(require("../doctor/dao"));
class PatientService {
    static createPatient(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientDao = new dao_1.default(model_1.default);
                const patientFound = yield patientDao.find({
                    email: patient.email,
                });
                if (patientFound && patientFound.length > 0) {
                    throw new HttpError_utils_1.default("User already exists", "USER_ALREADY_EXISTS", HttpStatus_1.default.CONFLICT);
                }
                const patientPayload = new model_1.default(Object.assign(Object.assign({}, patient), { createdAt: new Date() }));
                const patientCreated = yield patientDao.create(patientPayload);
                if (!patientCreated) {
                    throw new HttpError_utils_1.default("User not created", "USER_NOT_CREATED", HttpStatus_1.default.SERVER_ERROR);
                }
                const userCleaned = dto_1.default.patientDTO(patientCreated);
                return userCleaned;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
    static updatePatient(user, updateFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientDao = new dao_2.default();
                const patientFound = yield patientDao.read(user.id);
                if (!patientFound) {
                    throw new HttpError_utils_1.default("User not found", "USER_NOT_FOUND", HttpStatus_1.default.NOT_FOUND);
                }
                const patientPayload = Object.assign(Object.assign({}, patientFound), updateFields);
                if (Object.keys(updateFields).some((field) => this.ClinicalFields.includes(field))) {
                    const patientClinicalDataCreated = yield services_1.default.createClinicalData(updateFields, new mongoose_1.Types.ObjectId(user.id));
                    patientPayload.clinicalData =
                        patientClinicalDataCreated._id;
                }
                const updatedPatient = yield patientDao.update(patientFound._id.toString(), patientPayload);
                if (!updatedPatient) {
                    throw new HttpError_utils_1.default("User not updated", "USER_NOT_UPDATED", HttpStatus_1.default.SERVER_ERROR);
                }
                const userCleaned = dto_1.default.patientDTO(updatedPatient);
                return userCleaned;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
    static addMedicalInformation(user, modelID, fieldToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientDao = new dao_2.default();
                const patientFound = yield patientDao.read(user.id);
                if (!patientFound) {
                    throw new HttpError_utils_1.default("User not found", "USER_NOT_FOUND", HttpStatus_1.default.NOT_FOUND);
                }
                const idToAdd = fieldToUpdate === PatientFields_1.PatientFields.DOCUMENTS
                    ? [
                        ...patientFound.documents,
                        ...modelID,
                    ]
                    : fieldToUpdate === PatientFields_1.PatientFields.MEDICATIONS_DATA
                        ? [
                            ...patientFound.medications.map((med) => med._id),
                            modelID,
                        ]
                        : modelID;
                const patientPayload = Object.assign(Object.assign({}, patientFound), { [fieldToUpdate]: idToAdd });
                const updatedPatient = yield patientDao.update(patientFound._id.toString(), patientPayload);
                if (!updatedPatient) {
                    throw new HttpError_utils_1.default("User not updated", "USER_NOT_UPDATED", HttpStatus_1.default.SERVER_ERROR);
                }
                const userCleaned = dto_1.default.patientDTO(updatedPatient);
                return userCleaned;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
    static getAllPatients() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientDao = new dao_1.default(model_1.default);
                const patients = yield patientDao.find({ role: Roles_1.Roles.PATIENT });
                if (!patients || patients.length === 0) {
                    throw new HttpError_utils_1.default("No patients found", "NO_PATIENTS_FOUND", HttpStatus_1.default.NOT_FOUND);
                }
                const patientsResponse = dto_1.default.patientsArrayDTO(patients);
                return patientsResponse;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
    static getPatientById(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (user && user.role === Roles_1.Roles.PATIENT && user.id !== id) {
                    throw new HttpError_utils_1.default("You are not authorized to access this patient", "NOT_AUTHORIZED", HttpStatus_1.default.UNAUTHORIZED);
                }
                let patient;
                if (user && user.role === Roles_1.Roles.DOCTOR && user.id !== id) {
                    const patientRepository = new repository_1.default(model_1.default);
                    const patientByDoctor = yield patientRepository.getPatient({
                        $and: [
                            { _id: new mongoose_1.Types.ObjectId(id) },
                            { authorizedDoctors: new mongoose_1.Types.ObjectId(user.id) },
                        ],
                    });
                    patient = patientByDoctor;
                }
                else {
                    const patientDao = new dao_2.default();
                    patient = yield patientDao.read(id);
                }
                if (!patient) {
                    throw new HttpError_utils_1.default("Patient not found", "PATIENT_NOT_FOUND", HttpStatus_1.default.NOT_FOUND);
                }
                const patientCleaned = dto_1.default.patientDTO(patient);
                return patientCleaned;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
    static getPatientByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientRepository = new repository_1.default(model_1.default);
                const patient = yield patientRepository.getPatient({
                    email: email,
                });
                if (!patient) {
                    throw new HttpError_utils_1.default("Patient not found", "PATIENT_NOT_FOUND", HttpStatus_1.default.NOT_FOUND);
                }
                const patientCleaned = dto_1.default.patientDTO(patient);
                return patientCleaned;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
    static authorizeDoctor(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userDao = new dao_1.default(model_1.default);
                const patientFound = yield userDao.read(user.id);
                if (!patientFound) {
                    throw new HttpError_utils_1.default("User not found", "USER_NOT_FOUND", HttpStatus_1.default.NOT_FOUND);
                }
                const decodedToken = jsonwebtoken_1.default.verify(token, enviroment_config_1.default.JWT_SECRET);
                const tokenData = JSON.stringify(decodedToken);
                const doctorId = JSON.parse(tokenData).doctorId;
                const doctorFound = yield service_1.default.getDoctorById(doctorId);
                if (!doctorFound) {
                    throw new HttpError_utils_1.default("Doctor not found", "DOCTOR_NOT_FOUND", HttpStatus_1.default.NOT_FOUND);
                }
                const patientDoctorsAuthorized = patientFound.authorizedDoctors.map((authDoc) => authDoc.toString());
                if (!doctorFound.id) {
                    throw new HttpError_utils_1.default("Doctor not found", "DOCTOR_NOT_FOUND", HttpStatus_1.default.NOT_FOUND);
                }
                if (patientDoctorsAuthorized.includes(doctorFound.id)) {
                    throw new HttpError_utils_1.default("Doctor already authorized", "DOCTOR_ALREADY_AUTHORIZED", HttpStatus_1.default.CONFLICT);
                }
                const patientPayload = Object.assign(Object.assign({}, patientFound), { authorizedDoctors: [
                        ...patientFound.authorizedDoctors.map((authorizeDoctor) => new mongoose_1.Types.ObjectId(authorizeDoctor)),
                        new mongoose_1.Types.ObjectId(doctorFound.id),
                    ], updatedAt: new Date() });
                const patientDao = new dao_2.default();
                const doctorPayload = Object.assign(Object.assign({}, doctorFound), { patients: [
                        ...(doctorFound.patients
                            ? (_a = doctorFound.patients) === null || _a === void 0 ? void 0 : _a.map((pat) => pat._id)
                            : []),
                        patientFound._id,
                    ], updatedAt: new Date(), role: doctorFound.role });
                const doctorDao = new dao_3.default();
                const [updatedPatient, updatedDoctor] = yield Promise.all([
                    patientDao.update(patientFound._id.toString(), patientPayload),
                    doctorDao.update(doctorFound.id, doctorPayload),
                ]);
                if (!updatedPatient) {
                    throw new HttpError_utils_1.default("User not updated", "USER_NOT_UPDATED", HttpStatus_1.default.SERVER_ERROR);
                }
                if (!updatedDoctor) {
                    throw new HttpError_utils_1.default("Doctor not updated", "DOCTOR_NOT_UPDATED", HttpStatus_1.default.SERVER_ERROR);
                }
                const userCleaned = dto_1.default.patientDTO(updatedPatient);
                return userCleaned;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
}
PatientService.ClinicalFields = [
    "height",
    "weight",
    "bloodType",
    "bloodPressureTrend",
    "isDonor",
    "hasAllergies",
    "hasChronicDiseases",
    "hasHealthyLifestyle",
];
exports.default = PatientService;

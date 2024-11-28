"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dto_1 = __importDefault(require("../patientClinicalData/dto"));
const dto_2 = __importDefault(require("../patientAllergieData/dto"));
const dto_3 = __importDefault(require("../patientFamilyInheritance/dto"));
const dto_4 = __importDefault(require("../patientPathologicalData/dto"));
const dto_5 = __importDefault(require("../patientNonPathologicalData/dto"));
const dto_6 = __importDefault(require("../patientVaccinationShedule/dto"));
const dto_7 = __importDefault(require("../patientMedications/dto"));
const dto_8 = __importDefault(require("../documents/dto"));
class PatientDto {
    static patientsArrayDTO(patients) {
        return patients.map((patient) => {
            return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ id: patient._id.toString(), email: patient.email, role: patient.role }, (patient.firstName ? { firstName: patient.firstName } : {})), (patient.lastName ? { lastName: patient.lastName } : {})), (patient.avatar ? { avatar: patient.avatar } : {})), (patient.dateOfBirth
                ? { dateOfBirth: patient.dateOfBirth }
                : {})), (patient.gender ? { gender: patient.gender } : {})), (patient.aboutMe ? { aboutMe: patient.aboutMe } : {})), (patient.phone ? { phone: patient.phone } : {})), (patient.location ? { location: patient.location } : {})), (patient.insuranceProvider
                ? { insuranceProvider: patient.insuranceProvider }
                : {})), (patient.insuranceNumber
                ? { insuranceNumber: patient.insuranceNumber }
                : {})), (patient.clinicalData
                ? {
                    clinicalData: patient.clinicalData instanceof mongoose_1.Types.ObjectId
                        ? patient.clinicalData.toString()
                        : dto_1.default.patientClinicalDataDTO(patient.clinicalData),
                }
                : {})), (patient.allergiesData
                ? {
                    allergiesData: patient.allergiesData instanceof mongoose_1.Types.ObjectId
                        ? patient.allergiesData.toString()
                        : dto_2.default.patientAllergieDataDTO(patient.allergiesData),
                }
                : {})), (patient.pathologicalData
                ? {
                    pathologicalData: patient.pathologicalData instanceof mongoose_1.Types.ObjectId
                        ? patient.pathologicalData.toString()
                        : dto_4.default.patientPathologicalDataDTO(patient.pathologicalData),
                }
                : {})), (patient.nonPathologicalData
                ? {
                    nonPathologicalData: patient.nonPathologicalData instanceof
                        mongoose_1.Types.ObjectId
                        ? patient.nonPathologicalData.toString()
                        : dto_5.default.patientNonPathologicalDataDTO(patient.nonPathologicalData),
                }
                : {})), (patient.familyInheritance
                ? {
                    familyInheritance: patient.familyInheritance instanceof
                        mongoose_1.Types.ObjectId
                        ? patient.familyInheritance.toString()
                        : dto_3.default.patientFamilyInheritanceDTO(patient.familyInheritance),
                }
                : {})), (patient.vaccinationShedule
                ? {
                    vaccinationShedule: patient.vaccinationShedule instanceof
                        mongoose_1.Types.ObjectId
                        ? patient.vaccinationShedule.toString()
                        : dto_6.default.patientVaccinationSheduleDTO(patient.vaccinationShedule),
                }
                : {})), (patient.documents
                ? {
                    documents: patient.documents.map((doc) => doc instanceof mongoose_1.Types.ObjectId
                        ? doc.toString()
                        : dto_8.default.PatientDocumentsDTO(doc)),
                }
                : {})), (patient.medications
                ? {
                    medications: patient.medications.map((med) => med instanceof mongoose_1.Types.ObjectId
                        ? med.toString()
                        : dto_7.default.PatientMedicationDTO(med)),
                }
                : {})), (patient.authorizedDoctors
                ? {
                    authorizedDoctors: patient.authorizedDoctors.map((doc) => doc.toString()),
                }
                : {})), (patient.gender ? { gender: patient.gender } : {})), (patient.status ? { status: patient.status } : {})), (patient.createdAt ? { createdAt: patient.createdAt } : {})), (patient.updatedAt ? { updatedAt: patient.updatedAt } : {}));
        });
    }
    static patientDTO(patient) {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ id: patient._id.toString(), email: patient.email, role: patient.role }, (patient.firstName ? { firstName: patient.firstName } : {})), (patient.lastName ? { lastName: patient.lastName } : {})), (patient.avatar ? { avatar: patient.avatar } : {})), (patient.dateOfBirth
            ? { dateOfBirth: patient.dateOfBirth }
            : {})), (patient.gender ? { gender: patient.gender } : {})), (patient.aboutMe ? { aboutMe: patient.aboutMe } : {})), (patient.phone ? { phone: patient.phone } : {})), (patient.location ? { location: patient.location } : {})), (patient.insuranceProvider
            ? { insuranceProvider: patient.insuranceProvider }
            : {})), (patient.insuranceNumber
            ? { insuranceNumber: patient.insuranceNumber }
            : {})), (patient.clinicalData
            ? {
                clinicalData: patient.clinicalData instanceof mongoose_1.Types.ObjectId
                    ? patient.clinicalData.toString()
                    : dto_1.default.patientClinicalDataDTO(patient.clinicalData),
            }
            : {})), (patient.allergiesData
            ? {
                allergiesData: patient.allergiesData instanceof mongoose_1.Types.ObjectId
                    ? patient.allergiesData.toString()
                    : dto_2.default.patientAllergieDataDTO(patient.allergiesData),
            }
            : {})), (patient.pathologicalData
            ? {
                pathologicalData: patient.pathologicalData instanceof mongoose_1.Types.ObjectId
                    ? patient.pathologicalData.toString()
                    : dto_4.default.patientPathologicalDataDTO(patient.pathologicalData),
            }
            : {})), (patient.nonPathologicalData
            ? {
                nonPathologicalData: patient.nonPathologicalData instanceof mongoose_1.Types.ObjectId
                    ? patient.nonPathologicalData.toString()
                    : dto_5.default.patientNonPathologicalDataDTO(patient.nonPathologicalData),
            }
            : {})), (patient.familyInheritance
            ? {
                familyInheritance: patient.familyInheritance instanceof mongoose_1.Types.ObjectId
                    ? patient.familyInheritance.toString()
                    : dto_3.default.patientFamilyInheritanceDTO(patient.familyInheritance),
            }
            : {})), (patient.vaccinationShedule
            ? {
                vaccinationShedule: patient.vaccinationShedule instanceof mongoose_1.Types.ObjectId
                    ? patient.vaccinationShedule.toString()
                    : dto_6.default.patientVaccinationSheduleDTO(patient.vaccinationShedule),
            }
            : {})), (patient.documents
            ? {
                documents: patient.documents.map((doc) => doc instanceof mongoose_1.Types.ObjectId
                    ? doc.toString()
                    : dto_8.default.PatientDocumentsDTO(doc)),
            }
            : {})), (patient.medications
            ? {
                medications: patient.medications.map((med) => med instanceof mongoose_1.Types.ObjectId
                    ? med.toString()
                    : dto_7.default.PatientMedicationDTO(med)),
            }
            : {})), (patient.authorizedDoctors
            ? {
                authorizedDoctors: patient.authorizedDoctors.map((doc) => doc.toString()),
            }
            : {})), (patient.gender ? { gender: patient.gender } : {})), (patient.status ? { status: patient.status } : {})), (patient.createdAt ? { createdAt: patient.createdAt } : {})), (patient.updatedAt ? { updatedAt: patient.updatedAt } : {}));
    }
}
exports.default = PatientDto;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dto_1 = __importDefault(require("../patient/dto"));
class DoctorDto {
    static doctorDTO(doctor) {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ id: doctor._id.toString(), licenseNumber: doctor.licenseNumber, email: doctor.email, role: doctor.role }, (doctor.gender ? { gender: doctor.gender } : {})), (doctor.location ? { location: doctor.location } : {})), { specialization: doctor.specialization }), (doctor.firstName ? { firstName: doctor.firstName } : {})), (doctor.lastName ? { lastName: doctor.lastName } : {})), (doctor.location ? { location: doctor.location } : {})), (doctor.avatar ? { avatar: doctor.avatar } : {})), (doctor.phone ? { phone: doctor.phone } : {})), (doctor.clinics
            ? {
                clinic: doctor.clinics.map((clinic) => clinic instanceof mongoose_1.Types.ObjectId ? clinic._id : clinic),
            }
            : {})), (doctor.patients
            ? {
                patients: doctor.patients.map((patient) => patient instanceof mongoose_1.Types.ObjectId
                    ? patient._id
                    : dto_1.default.patientDTO(patient)),
            }
            : {})), (doctor.aboutMe ? { aboutMe: doctor.aboutMe } : {}));
    }
    static doctorsArrayDTO(doctors) {
        return doctors.map((doctor) => {
            return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ id: doctor._id.toString(), licenseNumber: doctor.licenseNumber, email: doctor.email, role: doctor.role, specialization: doctor.specialization }, (doctor.firstName ? { firstName: doctor.firstName } : {})), (doctor.lastName ? { lastName: doctor.lastName } : {})), (doctor.location ? { location: doctor.location } : {})), (doctor.avatar ? { avatar: doctor.avatar } : {})), (doctor.phone ? { phone: doctor.phone } : {})), (doctor.clinics
                ? {
                    clinic: doctor.clinics.map((clinic) => clinic instanceof mongoose_1.Types.ObjectId
                        ? clinic._id
                        : clinic),
                }
                : {})), (doctor.patients
                ? {
                    patients: doctor.patients.map((patient) => patient instanceof mongoose_1.Types.ObjectId
                        ? patient._id
                        : dto_1.default.patientDTO(patient)),
                }
                : {})), (doctor.aboutMe ? { aboutMe: doctor.aboutMe } : {}));
        });
    }
}
exports.default = DoctorDto;

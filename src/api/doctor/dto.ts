import { Types } from "mongoose";
import { DoctorResponse, IDoctor } from "./interface";
import PatientDto from "../patient/dto";

export default class DoctorDto {
    static doctorDTO(doctor: IDoctor): DoctorResponse {
        return {
            id: doctor._id.toString(),
            licenseNumber: doctor.licenseNumber,
            email: doctor.email,
            role: doctor.role,
            ...(doctor.gender ? { gender: doctor.gender } : {}),
            ...(doctor.location ? { location: doctor.location } : {}),
            specialization: doctor.specialization,
            ...(doctor.firstName ? { firstName: doctor.firstName } : {}),
            ...(doctor.lastName ? { lastName: doctor.lastName } : {}),
            ...(doctor.location ? { location: doctor.location } : {}),
            ...(doctor.avatar ? { avatar: doctor.avatar } : {}),
            ...(doctor.phone ? { phone: doctor.phone } : {}),
            ...(doctor.clinic ? { clinic: doctor.clinic } : {}),
            ...(doctor.patients
                ? {
                      patients: doctor.patients.map((patient) =>
                          patient instanceof Types.ObjectId
                              ? patient._id
                              : PatientDto.patientDTO(patient)
                      ),
                  }
                : {}),
            // ...(doctor.consultations
            //     ? { consultations: doctor.consultations }
            //     : {}),
        };
    }

    static doctorsArrayDTO(doctors: IDoctor[]): DoctorResponse[] {
        return doctors.map((doctor) => {
            return {
                id: doctor._id.toString(),
                licenseNumber: doctor.licenseNumber,
                email: doctor.email,
                role: doctor.role,
                specialization: doctor.specialization,
                ...(doctor.firstName ? { firstName: doctor.firstName } : {}),
                ...(doctor.lastName ? { lastName: doctor.lastName } : {}),
                ...(doctor.location ? { location: doctor.location } : {}),
                ...(doctor.avatar ? { avatar: doctor.avatar } : {}),
                ...(doctor.phone ? { phone: doctor.phone } : {}),
                ...(doctor.clinic ? { clinic: doctor.clinic } : {}),
                ...(doctor.patients
                    ? {
                          patients: doctor.patients.map((patient) =>
                              patient instanceof Types.ObjectId
                                  ? patient._id
                                  : PatientDto.patientDTO(patient)
                          ),
                      }
                    : {}),
                // ...(doctor.consultations
                //     ? { consultations: doctor.consultations }
                //     : {}),
            };
        });
    }
}

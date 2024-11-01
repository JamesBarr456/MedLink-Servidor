import { DoctorResponse, IDoctor } from "./interface";

export default class DoctorDto {
    static doctorDTO(doctor: IDoctor): DoctorResponse {
        return {
            id: doctor._id.toString(),
            licenseNumber: doctor.licenseNumber,
            email: doctor.email,
            role: doctor.role,
            specialization: doctor.specialization,
            ...(doctor.firstName ? { firstName: doctor.firstName } : {}),
            ...(doctor.lastName ? { lastName: doctor.lastName } : {}),
            ...(doctor.address ? { address: doctor.address } : {}),
            ...(doctor.avatar ? { avatar: doctor.avatar } : {}),
            ...(doctor.phone ? { phone: doctor.phone } : {}),
            ...(doctor.clinic ? { clinic: doctor.clinic } : {}),
            ...(doctor.patients ? { patients: doctor.patients } : {}),
            ...(doctor.consultations
                ? { consultations: doctor.consultations }
                : {}),
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
                ...(doctor.address ? { address: doctor.address } : {}),
                ...(doctor.avatar ? { avatar: doctor.avatar } : {}),
                ...(doctor.phone ? { phone: doctor.phone } : {}),
                ...(doctor.clinic ? { clinic: doctor.clinic } : {}),
                ...(doctor.patients ? { patients: doctor.patients } : {}),
                ...(doctor.consultations
                    ? { consultations: doctor.consultations }
                    : {}),
            };
        });
    }
}

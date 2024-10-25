// INTERFACES
import { IPatient, PatientResponse } from "./interface";

export default class PatientDto {
    static patientsArrayDTO(patients: IPatient[]): PatientResponse[] {
        return patients.map((patient) => {
            return {
                id: patient._id.toString(),
                firstName: patient.firstName,
                lastName: patient.lastName,
                email: patient.email,
                role: patient.role,
                avatarUrl: patient.avatar,
            };
        });
    }

    static patientDTO(patient: IPatient): PatientResponse {
        return {
            id: patient._id.toString(),
            firstName: patient.firstName,
            lastName: patient.lastName,
            email: patient.email,
            role: patient.role,
            avatarUrl: patient.avatar,
        };
    }
}

import { Types } from "mongoose";
// INTERFACES
import { IPatient, PatientResponse } from "./interface";
import PatientClinicalDataDto from "../patientClinicalData/dto";

export default class PatientDto {
    static patientsArrayDTO(patients: IPatient[]): Partial<PatientResponse>[] {
        return patients.map((patient) => {
            return {
                id: patient._id.toString(),
                email: patient.email,
                role: patient.role,
                ...(patient.firstName ? { firstName: patient.firstName } : {}),
                ...(patient.lastName ? { lastName: patient.lastName } : {}),
                ...(patient.avatar ? { avatar: patient.avatar } : {}),
                ...(patient.insuranceProvider
                    ? { insuranceProvider: patient.insuranceProvider }
                    : {}),
                ...(patient.insuranceNumber
                    ? { insuranceNumber: patient.insuranceNumber }
                    : {}),
                ...(patient.files ? { files: patient.files } : {}),
                ...(patient.clinicalData
                    ? {
                          clinicalData:
                              patient.clinicalData instanceof Types.ObjectId
                                  ? patient.clinicalData.toString()
                                  : patient.clinicalData,
                      }
                    : {}),
                ...(patient.allergiesData
                    ? { allergiesData: patient.allergiesData.toString() }
                    : {}),
                ...(patient.pathologycalData
                    ? { pathologycalData: patient.pathologycalData.toString() }
                    : {}),
                ...(patient.nonPathogicalData
                    ? {
                          nonPathogicalData:
                              patient.nonPathogicalData.toString(),
                      }
                    : {}),
                ...(patient.familyInheritance
                    ? {
                          familyInheritance:
                              patient.familyInheritance.toString(),
                      }
                    : {}),
                ...(patient.vaccinationShedule
                    ? {
                          vaccinationShedule:
                              patient.vaccinationShedule.toString(),
                      }
                    : {}),
                ...(patient.documents
                    ? {
                          documents: patient.documents.map((doc) =>
                              doc.toString()
                          ),
                      }
                    : {}),
                ...(patient.medications
                    ? {
                          medications: patient.medications.map((med) =>
                              med.toString()
                          ),
                      }
                    : {}),
                ...(patient.authorizedDoctors
                    ? {
                          authorizedDoctors: patient.authorizedDoctors.map(
                              (doc) => doc.toString()
                          ),
                      }
                    : {}),
                ...(patient.gender ? { gender: patient.gender } : {}),
                ...(patient.status ? { status: patient.status } : {}),
                ...(patient.createdAt ? { createdAt: patient.createdAt } : {}),
                ...(patient.updatedAt ? { updatedAt: patient.updatedAt } : {}),
            };
        });
    }

    static patientDTO(patient: IPatient): Partial<PatientResponse> {
        return {
            id: patient._id.toString(),
            email: patient.email,
            role: patient.role,
            ...(patient.firstName ? { firstName: patient.firstName } : {}),
            ...(patient.lastName ? { lastName: patient.lastName } : {}),
            ...(patient.dateOfBirth
                ? { dateOfBirth: patient.dateOfBirth }
                : {}),
            ...(patient.avatar ? { avatar: patient.avatar } : {}),
            ...(patient.insuranceProvider
                ? { insuranceProvider: patient.insuranceProvider }
                : {}),
            ...(patient.insuranceNumber
                ? { insuranceNumber: patient.insuranceNumber }
                : {}),
            ...(patient.files ? { files: patient.files } : {}),
            ...(patient.clinicalData
                ? {
                      clinicalData:
                          patient.clinicalData instanceof Types.ObjectId
                              ? patient.clinicalData.toString()
                              : PatientClinicalDataDto.patientClinicalDataDTO(
                                    patient.clinicalData
                                ),
                  }
                : {}),
            ...(patient.allergiesData
                ? { allergiesData: patient.allergiesData.toString() }
                : {}),
            ...(patient.pathologycalData
                ? { pathologycalData: patient.pathologycalData.toString() }
                : {}),
            ...(patient.nonPathogicalData
                ? {
                      nonPathogicalData: patient.nonPathogicalData.toString(),
                  }
                : {}),
            ...(patient.familyInheritance
                ? {
                      familyInheritance: patient.familyInheritance.toString(),
                  }
                : {}),
            ...(patient.vaccinationShedule
                ? {
                      vaccinationShedule: patient.vaccinationShedule.toString(),
                  }
                : {}),
            ...(patient.documents
                ? {
                      documents: patient.documents.map((doc) => doc.toString()),
                  }
                : {}),
            ...(patient.medications
                ? {
                      medications: patient.medications.map((med) =>
                          med.toString()
                      ),
                  }
                : {}),
            ...(patient.authorizedDoctors
                ? {
                      authorizedDoctors: patient.authorizedDoctors.map((doc) =>
                          doc.toString()
                      ),
                  }
                : {}),
            ...(patient.gender ? { gender: patient.gender } : {}),
            ...(patient.status ? { status: patient.status } : {}),
            ...(patient.createdAt ? { createdAt: patient.createdAt } : {}),
            ...(patient.updatedAt ? { updatedAt: patient.updatedAt } : {}),
        };
    }
}

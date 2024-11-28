import { Types } from "mongoose";
// INTERFACES
import { IPatient, PatientResponse } from "./interface";
import PatientClinicalDataDto from "../patientClinicalData/dto";
import PatientAllergieDataDto from "../patientAllergieData/dto";
import PatientFamilyInheritanceDto from "../patientFamilyInheritance/dto";
import PatientPathologicalDataDto from "../patientPathologicalData/dto";
import PatientNonPathologicalDataDto from "../patientNonPathologicalData/dto";
import PatientVaccinationSheduleDto from "../patientVaccinationShedule/dto";
import PatientMedicationDto from "../patientMedications/dto";
import PatientDocumentsDto from "../documents/dto";

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

                ...(patient.dateOfBirth
                    ? { dateOfBirth: patient.dateOfBirth }
                    : {}),
                ...(patient.gender ? { gender: patient.gender } : {}),
                ...(patient.aboutMe ? { aboutMe: patient.aboutMe } : {}),
                ...(patient.phone ? { phone: patient.phone } : {}),
                ...(patient.location ? { location: patient.location } : {}),
                ...(patient.insuranceProvider
                    ? { insuranceProvider: patient.insuranceProvider }
                    : {}),
                ...(patient.insuranceNumber
                    ? { insuranceNumber: patient.insuranceNumber }
                    : {}),
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
                    ? {
                          allergiesData:
                              patient.allergiesData instanceof Types.ObjectId
                                  ? patient.allergiesData.toString()
                                  : PatientAllergieDataDto.patientAllergieDataDTO(
                                        patient.allergiesData
                                    ),
                      }
                    : {}),
                ...(patient.pathologicalData
                    ? {
                          pathologicalData:
                              patient.pathologicalData instanceof Types.ObjectId
                                  ? patient.pathologicalData.toString()
                                  : PatientPathologicalDataDto.patientPathologicalDataDTO(
                                        patient.pathologicalData
                                    ),
                      }
                    : {}),
                ...(patient.nonPathologicalData
                    ? {
                          nonPathologicalData:
                              patient.nonPathologicalData instanceof
                              Types.ObjectId
                                  ? patient.nonPathologicalData.toString()
                                  : PatientNonPathologicalDataDto.patientNonPathologicalDataDTO(
                                        patient.nonPathologicalData
                                    ),
                      }
                    : {}),
                ...(patient.familyInheritance
                    ? {
                          familyInheritance:
                              patient.familyInheritance instanceof
                              Types.ObjectId
                                  ? patient.familyInheritance.toString()
                                  : PatientFamilyInheritanceDto.patientFamilyInheritanceDTO(
                                        patient.familyInheritance
                                    ),
                      }
                    : {}),
                ...(patient.vaccinationShedule
                    ? {
                          vaccinationShedule:
                              patient.vaccinationShedule instanceof
                              Types.ObjectId
                                  ? patient.vaccinationShedule.toString()
                                  : PatientVaccinationSheduleDto.patientVaccinationSheduleDTO(
                                        patient.vaccinationShedule
                                    ),
                      }
                    : {}),
                ...(patient.documents
                    ? {
                          documents: patient.documents.map((doc) =>
                              doc instanceof Types.ObjectId
                                  ? doc.toString()
                                  : PatientDocumentsDto.PatientDocumentsDTO(doc)
                          ),
                      }
                    : {}),
                ...(patient.medications
                    ? {
                          medications: patient.medications.map((med) =>
                              med instanceof Types.ObjectId
                                  ? med.toString()
                                  : PatientMedicationDto.PatientMedicationDTO(
                                        med
                                    )
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
            ...(patient.avatar ? { avatar: patient.avatar } : {}),

            ...(patient.dateOfBirth
                ? { dateOfBirth: patient.dateOfBirth }
                : {}),
            ...(patient.gender ? { gender: patient.gender } : {}),
            ...(patient.aboutMe ? { aboutMe: patient.aboutMe } : {}),
            ...(patient.phone ? { phone: patient.phone } : {}),
            ...(patient.location ? { location: patient.location } : {}),
            ...(patient.insuranceProvider
                ? { insuranceProvider: patient.insuranceProvider }
                : {}),
            ...(patient.insuranceNumber
                ? { insuranceNumber: patient.insuranceNumber }
                : {}),
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
                ? {
                      allergiesData:
                          patient.allergiesData instanceof Types.ObjectId
                              ? patient.allergiesData.toString()
                              : PatientAllergieDataDto.patientAllergieDataDTO(
                                    patient.allergiesData
                                ),
                  }
                : {}),
            ...(patient.pathologicalData
                ? {
                      pathologicalData:
                          patient.pathologicalData instanceof Types.ObjectId
                              ? patient.pathologicalData.toString()
                              : PatientPathologicalDataDto.patientPathologicalDataDTO(
                                    patient.pathologicalData
                                ),
                  }
                : {}),
            ...(patient.nonPathologicalData
                ? {
                      nonPathologicalData:
                          patient.nonPathologicalData instanceof Types.ObjectId
                              ? patient.nonPathologicalData.toString()
                              : PatientNonPathologicalDataDto.patientNonPathologicalDataDTO(
                                    patient.nonPathologicalData
                                ),
                  }
                : {}),
            ...(patient.familyInheritance
                ? {
                      familyInheritance:
                          patient.familyInheritance instanceof Types.ObjectId
                              ? patient.familyInheritance.toString()
                              : PatientFamilyInheritanceDto.patientFamilyInheritanceDTO(
                                    patient.familyInheritance
                                ),
                  }
                : {}),
            ...(patient.vaccinationShedule
                ? {
                      vaccinationShedule:
                          patient.vaccinationShedule instanceof Types.ObjectId
                              ? patient.vaccinationShedule.toString()
                              : PatientVaccinationSheduleDto.patientVaccinationSheduleDTO(
                                    patient.vaccinationShedule
                                ),
                  }
                : {}),
            ...(patient.documents
                ? {
                      documents: patient.documents.map((doc) =>
                          doc instanceof Types.ObjectId
                              ? doc.toString()
                              : PatientDocumentsDto.PatientDocumentsDTO(doc)
                      ),
                  }
                : {}),
            ...(patient.medications
                ? {
                      medications: patient.medications.map((med) =>
                          med instanceof Types.ObjectId
                              ? med.toString()
                              : PatientMedicationDto.PatientMedicationDTO(med)
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

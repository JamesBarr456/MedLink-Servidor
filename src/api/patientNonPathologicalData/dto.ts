import IPatientNonPathologicalData from "./interface";

export default class PatientNonPathologicalDataDto {
    static patientNonPathologicalDataDTO(
        data: IPatientNonPathologicalData
    ): Partial<IPatientNonPathologicalData> {
        return {
            physicalActivity: data.physicalActivity,
            ...(data.physicalActivityDetails
                ? { physicalActivityDetails: data.physicalActivityDetails }
                : {}),
            smoking: data.smoking,
            ...(data.smokingDetails
                ? { smokingDetails: data.smokingDetails }
                : {}),
            alcoholism: data.alcoholism,
            ...(data.alcoholismDetails
                ? { alcoholismDetails: data.alcoholismDetails }
                : {}),
            otherSubstances: data.otherSubstances,
            ...(data.otherSubstancesDetails
                ? { otherSubstancesDetails: data.otherSubstancesDetails }
                : {}),
            recentVaccination: data.recentVaccination,
            ...(data.recentVaccinationDetails
                ? { recentVaccinationDetails: data.recentVaccinationDetails }
                : {}),
            other: data.other,
            ...(data.otherDetails ? { otherDetails: data.otherDetails } : {}),
        };
    }
}

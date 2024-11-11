import IPatientClinicalData from "./interface";

export default class PatientClinicalDataDto {
    static patientClinicalDataDTO(
        data: IPatientClinicalData
    ): Partial<IPatientClinicalData> {
        return {
            ...(data.height ? { height: data.height } : {}),
            ...(data.weight ? { weight: data.weight } : {}),
            ...(data.bloodType ? { bloodType: data.bloodType } : {}),
            ...(data.bloodPressureTrend
                ? { bloodPressureTrend: data.bloodPressureTrend }
                : {}),
            isDonor: data.isDonor,
            hasAllergies: data.hasAllergies,
            hasChronicDiseases: data.hasChronicDiseases,
            hasHealthyLifestyle: data.hasHealthyLifestyle,
        };
    }
}

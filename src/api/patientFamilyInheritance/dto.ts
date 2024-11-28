import IPatientFamilyInheritance from "./interface";

export default class PatientFamilyInheritanceDto {
    static patientFamilyInheritanceDTO(
        data: IPatientFamilyInheritance
    ): Partial<IPatientFamilyInheritance> {
        return {
            diabetes: data.diabetes,
            ...(data.diabetesDetails
                ? { diabetesDetails: data.diabetesDetails }
                : {}),
            heartDiseases: data.heartDiseases,
            ...(data.heartDiseasesDetails
                ? { heartDiseasesDetails: data.heartDiseasesDetails }
                : {}),
            hypertension: data.hypertension,
            ...(data.hypertensionDetails
                ? { hypertensionDetails: data.hypertensionDetails }
                : {}),
            thyroidDiseases: data.thyroidDiseases,
            ...(data.thyroidDiseasesDetails
                ? { thyroidDiseasesDetails: data.thyroidDiseasesDetails }
                : {}),
            chronicKidneyDisease: data.chronicKidneyDisease,
            ...(data.chronicKidneyDiseaseDetails
                ? {
                      chronicKidneyDiseaseDetails:
                          data.chronicKidneyDiseaseDetails,
                  }
                : {}),
            other: data.other,
            ...(data.otherDetails ? { otherDetails: data.otherDetails } : {}),
        };
    }
}

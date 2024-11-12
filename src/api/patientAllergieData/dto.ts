import IPatientAllergieData from "./interfaces";

export default class PatientAllergieDataDto {
    static patientAllergieDataDTO(
        data: IPatientAllergieData
    ): Partial<IPatientAllergieData> {
        return {
            foodAllergy: data.foodAllergy,
            ...(data.foodAllergyDetails
                ? { foodAllergyDetails: data.foodAllergyDetails }
                : {}),
            insectAllergy: data.insectAllergy,
            ...(data.insectAllergyDetails
                ? { insectAllergyDetails: data.insectAllergyDetails }
                : {}),
            medicineAllergy: data.medicineAllergy,
            ...(data.medicineAllergyDetails
                ? { medicineAllergyDetails: data.medicineAllergyDetails }
                : {}),
            otherAllergies: data.otherAllergies,
            ...(data.otherAllergiesDetails
                ? { otherAllergiesDetails: data.otherAllergiesDetails }
                : {}),
        };
    }
}

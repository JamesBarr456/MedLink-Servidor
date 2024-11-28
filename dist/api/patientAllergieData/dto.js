"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PatientAllergieDataDto {
    static patientAllergieDataDTO(data) {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ foodAllergy: data.foodAllergy }, (data.foodAllergyDetails
            ? { foodAllergyDetails: data.foodAllergyDetails }
            : {})), { insectAllergy: data.insectAllergy }), (data.insectAllergyDetails
            ? { insectAllergyDetails: data.insectAllergyDetails }
            : {})), { medicineAllergy: data.medicineAllergy }), (data.medicineAllergyDetails
            ? { medicineAllergyDetails: data.medicineAllergyDetails }
            : {})), { otherAllergies: data.otherAllergies }), (data.otherAllergiesDetails
            ? { otherAllergiesDetails: data.otherAllergiesDetails }
            : {}));
    }
}
exports.default = PatientAllergieDataDto;

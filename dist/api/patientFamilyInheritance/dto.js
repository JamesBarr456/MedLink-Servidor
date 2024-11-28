"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PatientFamilyInheritanceDto {
    static patientFamilyInheritanceDTO(data) {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ diabetes: data.diabetes }, (data.diabetesDetails
            ? { diabetesDetails: data.diabetesDetails }
            : {})), { heartDiseases: data.heartDiseases }), (data.heartDiseasesDetails
            ? { heartDiseasesDetails: data.heartDiseasesDetails }
            : {})), { hypertension: data.hypertension }), (data.hypertensionDetails
            ? { hypertensionDetails: data.hypertensionDetails }
            : {})), { thyroidDiseases: data.thyroidDiseases }), (data.thyroidDiseasesDetails
            ? { thyroidDiseasesDetails: data.thyroidDiseasesDetails }
            : {})), { chronicKidneyDisease: data.chronicKidneyDisease }), (data.chronicKidneyDiseaseDetails
            ? {
                chronicKidneyDiseaseDetails: data.chronicKidneyDiseaseDetails,
            }
            : {})), { other: data.other }), (data.otherDetails ? { otherDetails: data.otherDetails } : {}));
    }
}
exports.default = PatientFamilyInheritanceDto;

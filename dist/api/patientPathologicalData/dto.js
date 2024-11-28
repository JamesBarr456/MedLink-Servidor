"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PatientPathologicalDataDto {
    static patientPathologicalDataDTO(data) {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ hospitalization: data.hospitalization }, (data.hospitalizationDetails
            ? { hospitalizationDetails: data.hospitalizationDetails }
            : {})), { diabetes: data.diabetes }), (data.diabetesDetails
            ? { diabetesDetails: data.diabetesDetails }
            : {})), { thyroidDiseases: data.thyroidDiseases }), (data.thyroidDiseasesDetails
            ? { thyroidDiseasesDetails: data.thyroidDiseasesDetails }
            : {})), { hypertension: data.hypertension }), (data.hypertensionDetails
            ? { hypertensionDetails: data.hypertensionDetails }
            : {})), { heartDiseases: data.heartDiseases }), (data.heartDiseasesDetails
            ? { heartDiseasesDetails: data.heartDiseasesDetails }
            : {})), { trauma: data.trauma }), (data.traumaDetails
            ? { traumaDetails: data.traumaDetails }
            : {})), { cancer: data.cancer }), (data.cancerDetails
            ? { cancerDetails: data.cancerDetails }
            : {})), { tuberculosis: data.tuberculosis }), (data.tuberculosisDetails
            ? { tuberculosisDetails: data.tuberculosisDetails }
            : {})), { transfusions: data.transfusions }), (data.transfusionsDetails
            ? { transfusionsDetails: data.transfusionsDetails }
            : {})), { respiratoryDiseases: data.respiratoryDiseases }), (data.respiratoryDiseasesDetails
            ? {
                respiratoryDiseasesDetails: data.respiratoryDiseasesDetails,
            }
            : {})), { gastrointestinalDiseases: data.gastrointestinalDiseases }), (data.gastrointestinalDiseasesDetails
            ? {
                gastrointestinalDiseasesDetails: data.gastrointestinalDiseasesDetails,
            }
            : {})), { sexuallyTransmittedDiseases: data.sexuallyTransmittedDiseases }), (data.sexuallyTransmittedDiseasesDetails
            ? {
                sexuallyTransmittedDiseasesDetails: data.sexuallyTransmittedDiseasesDetails,
            }
            : {})), { chronicKidneyDisease: data.chronicKidneyDisease }), (data.chronicKidneyDiseaseDetails
            ? {
                chronicKidneyDiseaseDetails: data.chronicKidneyDiseaseDetails,
            }
            : {})), { other: data.other }), (data.otherDetails ? { otherDetails: data.otherDetails } : {}));
    }
}
exports.default = PatientPathologicalDataDto;

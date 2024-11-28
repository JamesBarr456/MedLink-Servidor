"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PatientNonPathologicalDataDto {
    static patientNonPathologicalDataDTO(data) {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ physicalActivity: data.physicalActivity }, (data.physicalActivityDetails
            ? { physicalActivityDetails: data.physicalActivityDetails }
            : {})), { smoking: data.smoking }), (data.smokingDetails
            ? { smokingDetails: data.smokingDetails }
            : {})), { alcoholism: data.alcoholism }), (data.alcoholismDetails
            ? { alcoholismDetails: data.alcoholismDetails }
            : {})), { otherSubstances: data.otherSubstances }), (data.otherSubstancesDetails
            ? { otherSubstancesDetails: data.otherSubstancesDetails }
            : {})), { recentVaccination: data.recentVaccination }), (data.recentVaccinationDetails
            ? { recentVaccinationDetails: data.recentVaccinationDetails }
            : {})), { other: data.other }), (data.otherDetails ? { otherDetails: data.otherDetails } : {}));
    }
}
exports.default = PatientNonPathologicalDataDto;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PatientClinicalDataDto {
    static patientClinicalDataDTO(data) {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (data.height ? { height: data.height } : {})), (data.weight ? { weight: data.weight } : {})), (data.bloodType ? { bloodType: data.bloodType } : {})), (data.bloodPressureTrend
            ? { bloodPressureTrend: data.bloodPressureTrend }
            : {})), { isDonor: data.isDonor, hasAllergies: data.hasAllergies, hasChronicDiseases: data.hasChronicDiseases, hasHealthyLifestyle: data.hasHealthyLifestyle });
    }
}
exports.default = PatientClinicalDataDto;

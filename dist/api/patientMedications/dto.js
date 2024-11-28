"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PatientMedicationDto {
    static PatientMedicationDTO(data) {
        return Object.assign({ medication: data.medication, dosage: data.dosage, frequency: data.frequency, startDate: data.startDate }, (data.endDate ? { endDate: data.endDate } : {}));
    }
}
exports.default = PatientMedicationDto;

import IPatientMedication from "./interface";

export default class PatientMedicationDto {
    static PatientMedicationDTO(
        data: Partial<IPatientMedication>
    ): Partial<IPatientMedication> {
        return {
            medication: data.medication,
            dosage: data.dosage,
            frequency: data.frequency,
            startDate: data.startDate,
            ...(data.endDate ? { endDate: data.endDate } : {}),
        };
    }
}

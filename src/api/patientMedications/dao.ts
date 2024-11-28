import IPatientMedication from "./interface";
import PatientMedication from "./model";

export default class PatientMedicationsDAO {
    static async create(
        patientMedicationPayload: Partial<IPatientMedication>
    ): Promise<IPatientMedication> {
        const patientMedicationDataSaved = await PatientMedication.create(
            patientMedicationPayload
        );
        return patientMedicationDataSaved;
    }
}

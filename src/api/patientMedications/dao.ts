import IPatientMedication from "./interface";
import PatientMedication from "./model";

export default class PatientMedicationsDAO {
    static async createOrUpdate(
        patientMedicationPayload: Partial<IPatientMedication>
    ): Promise<IPatientMedication> {
        const patientMedicationDataSaved =
            await PatientMedication.findOneAndUpdate(
                {
                    patientId: patientMedicationPayload.patientId,
                },
                {
                    $set: patientMedicationPayload,
                },
                {
                    upsert: true,
                    new: true,
                }
            );
        return patientMedicationDataSaved;
    }
}

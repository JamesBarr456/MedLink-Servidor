import IPatientAllergieData from "./interfaces";
import PatientAllergieData from "./model";

export default class PatientAllergieDataDAO {
    static async createOrUpdate(
        patientAllergieData: Partial<IPatientAllergieData>
    ): Promise<IPatientAllergieData> {
        const patientAllergieDataSaved =
            await PatientAllergieData.findOneAndUpdate(
                { patientId: patientAllergieData.patientId },
                {
                    $set: patientAllergieData,
                },
                { upsert: true, new: true }
            );
        return patientAllergieDataSaved;
    }
}

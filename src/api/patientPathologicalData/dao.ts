import IPatientPathologicalData from "./interface";
import PatientPathologicalData from "./model";

export default class PatientPathologicalDataDAO {
    static async createOrUpdate(
        patientPathologicalData: Partial<IPatientPathologicalData>
    ): Promise<IPatientPathologicalData> {
        const patientPathologicalDataSaved =
            await PatientPathologicalData.findOneAndUpdate(
                { patientId: patientPathologicalData.patientId },
                { $set: patientPathologicalData },
                { upsert: true, new: true }
            );
        return patientPathologicalDataSaved;
    }
}

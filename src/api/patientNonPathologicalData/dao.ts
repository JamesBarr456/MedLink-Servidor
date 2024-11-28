import IPatientNonPathologicalData from "./interface";
import PatientNonPathologicalData from "./model";

export default class PatientNonPathologicalDataDAO {
    static async createOrUpdate(
        patientNonPathologicalData: Partial<IPatientNonPathologicalData>
    ): Promise<IPatientNonPathologicalData> {
        const PatientNonPathologicalDataSaved =
            await PatientNonPathologicalData.findOneAndUpdate(
                { patientId: patientNonPathologicalData.patientId },
                {
                    $set: patientNonPathologicalData,
                },
                { upsert: true, new: true }
            );
        return PatientNonPathologicalDataSaved;
    }
}

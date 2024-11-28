import IPatientFamilyInheritance from "./interface";
import PatientFamilyInheritance from "./model";

export default class PatientFamilyInheritanceDAO {
    static async createOrUpdate(
        patientFamilyInheritance: Partial<IPatientFamilyInheritance>
    ): Promise<IPatientFamilyInheritance> {
        const patientFamilyInheritanceSaved =
            await PatientFamilyInheritance.findOneAndUpdate(
                { patientId: patientFamilyInheritance.patientId },
                {
                    $set: patientFamilyInheritance,
                },
                { upsert: true, new: true }
            );
        return patientFamilyInheritanceSaved;
    }
}

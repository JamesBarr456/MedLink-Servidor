import IPatientVaccinationShedule from "./interface";
import PatientVaccinationShedule from "./model";

export default class PatientVaccinationSheduleDAO {
    static async createOrUpdate(
        patientVaccinationSheduleData: Partial<IPatientVaccinationShedule>
    ): Promise<IPatientVaccinationShedule> {
        const patientVaccinationSheduleSaved =
            await PatientVaccinationShedule.findOneAndUpdate(
                { patientId: patientVaccinationSheduleData.patientId },
                {
                    $set: patientVaccinationSheduleData,
                },
                { upsert: true, new: true }
            );
        return patientVaccinationSheduleSaved;
    }
}

import PatientClinicalData from "./model";
import IPatientClinicalData from "./interface";

export default class PatientClinicalDataDAO {
    static async create(
        data: IPatientClinicalData
    ): Promise<IPatientClinicalData> {
        const clinicalData = await PatientClinicalData.create(data);
        return clinicalData;
    }

    static async read(id: string): Promise<IPatientClinicalData | null> {
        return (await PatientClinicalData.findById(
            id
        ).lean()) as IPatientClinicalData;
    }

    static async update(
        id: string,
        data: Partial<IPatientClinicalData>
    ): Promise<IPatientClinicalData | null> {
        return await PatientClinicalData.findByIdAndUpdate(id, data, {
            new: true,
        }).exec();
    }

    static async delete(id: string): Promise<IPatientClinicalData | null> {
        return await PatientClinicalData.findByIdAndDelete(id).exec();
    }

    static async readAll(): Promise<IPatientClinicalData[]> {
        return await PatientClinicalData.find().exec();
    }
}

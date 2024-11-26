import { IClinic } from "./interface";
import Clinic from "./model";

export default class ClinicDAO {
    async findByName(name: string): Promise<IClinic | null> {
        return Clinic.findOne({ name });
    }

    async create(clinic: Partial<IClinic>): Promise<IClinic> {
        return Clinic.create(clinic);
    }
}

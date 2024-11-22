// MODELS
import Doctor from "../doctor/model";
// DAOS
import UserDAO from "../user/dao";
// INTERFACES
import { IDoctor } from "./interface";

class DoctorDAO extends UserDAO<IDoctor> {
    constructor() {
        super(Doctor);
    }

    async read(id: string): Promise<IDoctor | null> {
        return (await Doctor.findById(id)
            .populate("patients")
            .lean()) as IDoctor | null;
    }
}

export default DoctorDAO;

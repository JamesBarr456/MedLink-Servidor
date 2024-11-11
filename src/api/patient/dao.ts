// MODELS
import { Types } from "mongoose";
import Patient from "../patient/model";
// DAOS
import UserDAO from "../user/dao";
// INTERFACES
import { IPatient } from "./interface";

class PatientDAO extends UserDAO<IPatient> {
    constructor() {
        super(Patient);
    }

    async update(
        id: string,
        data: Partial<IPatient>
    ): Promise<IPatient | null> {
        const patientId = new Types.ObjectId(id);
        return await Patient.findOneAndUpdate({ _id: patientId }, data, {
            new: true,
        }).populate("clinicalData");
    }
}

export default PatientDAO;

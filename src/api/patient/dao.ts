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

    async read(id: string): Promise<IPatient | null> {
        return await Patient.findById(id)
            .populate([
                "clinicalData",
                "allergiesData",
                "pathologicalData",
                "nonPathologicalData",
                "familyInheritance",
                "vaccinationShedule",
                "authorizedDoctors",
                "medications",
                "documents",
            ])
            .lean();
    }

    async update(
        id: string,
        data: Partial<IPatient>
    ): Promise<IPatient | null> {
        const patientId = new Types.ObjectId(id);
        return await Patient.findOneAndUpdate({ _id: patientId }, data, {
            new: true,
        })
            .populate([
                "clinicalData",
                "allergiesData",
                "familyInheritance",
                "pathologicalData",
                "nonPathologicalData",
                "vaccinationShedule",
                "medications",
                "documents",
            ])
            .lean();
    }
}

export default PatientDAO;

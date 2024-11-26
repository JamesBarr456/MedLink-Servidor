// MODELS
import Doctor from "../doctor/model";
// DAOS
import UserDAO from "../user/dao";
// INTERFACES
import { IDoctor, IDoctorPopulated } from "./interface";

export default class DoctorDAO extends UserDAO<IDoctor> {
    constructor() {
        super(Doctor);
    }

    async read(id: string): Promise<IDoctor | null> {
        return (await Doctor.findById(id)
            .populate({
                path: "patients",
                populate: [
                    { path: "clinicalData" },
                    { path: "allergiesData" },
                    { path: "pathologicalData" },
                    { path: "nonPathologicalData" },
                    { path: "familyInheritance" },
                    { path: "vaccinationShedule" },
                    { path: "authorizedDoctors" },
                    { path: "medications" },
                    { path: "documents" },
                ],
            })
            .lean()) as IDoctor | null;
    }
    async readAndPopulate(id: string): Promise<IDoctorPopulated | null> {
        return (await Doctor.findById(id)
            .populate({
                path: "patients",
                populate: [
                    { path: "clinicalData" },
                    { path: "allergiesData" },
                    { path: "pathologicalData" },
                    { path: "nonPathologicalData" },
                    { path: "familyInheritance" },
                    { path: "vaccinationShedule" },
                    { path: "authorizedDoctors" },
                    { path: "medications" },
                    { path: "documents" },
                ],
            })
            .lean()) as IDoctorPopulated | null;
    }

    async update(id: string, data: Partial<IDoctor>): Promise<IDoctor | null> {
        return await Doctor.findByIdAndUpdate(id, data, { new: true })
            .populate({
                path: "patients",
                populate: [
                    { path: "clinicalData" },
                    { path: "allergiesData" },
                    { path: "pathologicalData" },
                    { path: "nonPathologicalData" },
                    { path: "familyInheritance" },
                    { path: "vaccinationShedule" },
                    { path: "authorizedDoctors" },
                    { path: "medications" },
                    { path: "documents" },
                ],
            })
            .lean();
    }
}

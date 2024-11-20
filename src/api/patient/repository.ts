import { FilterQuery, Model } from "mongoose";
import { IPatient } from "./interface";

export default class PatientRepository {
    constructor(private readonly patientModel: Model<IPatient>) {
        this.patientModel = patientModel;
    }

    async getPatient(query: FilterQuery<IPatient>): Promise<IPatient | null> {
        const patient = (await this.patientModel
            .findOne(query)
            .populate([
                "clinicalData",
                "allergiesData",
                "pathologicalData",
                "nonPathologicalData",
                "familyInheritance",
                "vaccinationShedule",
                "authorizedDoctors",
            ])
            .lean()) as IPatient;
        return patient;
    }
}

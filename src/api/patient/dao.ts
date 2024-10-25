// MODELS
import Patient from "../patient/model";
// DAOS
import UserDAO from "../user/dao";
// INTERFACES
import { IPatient } from "./interface";

class PatientDAO extends UserDAO<IPatient> {
    constructor() {
        super(Patient);
    }
}

export default PatientDAO;

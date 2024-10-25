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
}

export default DoctorDAO;

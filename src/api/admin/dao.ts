// MODELS
import Admin from "../admin/model";
// DAOS
import UserDAO from "../user/dao";
// INTERFACES
import { IAdmin } from "./interface";

class AdminDAO extends UserDAO<IAdmin> {
    constructor() {
        super(Admin);
    }
}

export default AdminDAO;

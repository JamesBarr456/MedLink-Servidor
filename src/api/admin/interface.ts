// INTERFACES
import { IUser } from "../user/interface";

export interface IAdmin extends IUser {
    permissions: string[];
}

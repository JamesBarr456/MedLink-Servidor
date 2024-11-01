// LIBRARIES
import { Types, Document } from "mongoose";
// CONSTANTS
import { Roles } from "../../constants/Roles";

export interface IUser extends Document {
    _id: Types.ObjectId;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    avatar?: string;
    phone?: number;
    status: boolean;
    role: Roles;
    resetToken?: string;
    resetTokenExpires?: number;
    createdAt: Date;
    updatedAt?: Date;
    updatedBy?: string;
}

export interface UserLoginFields {
    email: string;
    password: string;
}

// LIBRARIES
import { Schema } from "mongoose";
// MODELS
import User from "../user/model";
// INTERFACES
import { IAdmin } from "./interface";

const Admin = User.discriminator(
    "Admin",
    new Schema<IAdmin>({
        permissions: [{ type: String }],
    })
);

export default Admin;

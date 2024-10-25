// LIBRARIES
import { Schema, model } from "mongoose";
// CONSTANTS
import { Roles } from "../../constants/Roles";
// UTILS
import { BcryptUtils } from "../../utils/bcrypt.utils";
// INTERFACES
import { IUser } from "./interface";

const userSchema = new Schema<IUser>(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                "Please fill a valid email",
            ],
        },
        password: { type: String, required: true },
        phone: { type: String },
        role: {
            type: String,
            enum: Roles,
            default: Roles.PATIENT,
            required: true,
        },
        status: { type: Boolean, required: true, default: true },
        resetToken: { type: String, default: "" },
        resetTokenExpires: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        updatedBy: { type: String },
    },
    { discriminatorKey: "role", timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        this.password = BcryptUtils.createHash(this.password);
        next();
    } else {
        next();
    }
});

const User = model("User", userSchema);

export default User;

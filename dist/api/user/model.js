"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// LIBRARIES
const mongoose_1 = require("mongoose");
// CONSTANTS
const Roles_1 = require("../../constants/Roles");
// UTILS
const bcrypt_utils_1 = require("../../utils/bcrypt.utils");
const Genders_1 = require("../../constants/Genders");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    gender: {
        type: String,
        enum: Genders_1.Genders,
    },
    aboutMe: { type: String },
    location: { type: String },
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
    phone: { type: Number },
    role: {
        type: String,
        enum: Roles_1.Roles,
        default: Roles_1.Roles.PATIENT,
        required: true,
    },
    avatar: { type: String },
    status: { type: Boolean, required: true, default: true },
    resetToken: { type: String, default: "" },
    resetTokenExpires: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: String },
}, { discriminatorKey: "role", timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password") || this.isNew) {
            this.password = bcrypt_utils_1.BcryptUtils.createHash(this.password);
            next();
        }
        else {
            next();
        }
    });
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;

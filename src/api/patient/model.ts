// LIBRARIES
import { Schema } from "mongoose";
// MODELS
import User from "../user/model";
// CONSTANTS
import { Genders } from "../../constants/Genders";
// INTERFACES
import { IPatient } from "./interface";

const Patient = User.discriminator(
    "Patient",
    new Schema<IPatient>({
        dateOfBirth: { type: Date },
        gender: {
            type: String,
            enum: Genders,
        },
        address: { type: String },
        insuranceProvider: { type: String },
        insuranceNumber: { type: String },
        avatar: { type: String },
        files: [{ type: String }],
        allergies: [{ type: String }],
        medications: [{ type: String }],
        bloodType: { type: String },
    })
);

export default Patient;

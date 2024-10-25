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
        dateOfBirth: { type: Date, required: true },
        gender: {
            type: String,
            enum: Genders,
            required: true,
        },
        address: { type: String },
        insuranceProvider: { type: String, required: true },
        insuranceNumber: { type: String },
        avatar: { type: String },
        files: [String],
        allergies: [String],
        medications: [String],
        bloodType: String,
    })
);

export default Patient;

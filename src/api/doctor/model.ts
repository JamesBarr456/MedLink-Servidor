// LIBRARIES
import { Schema } from "mongoose";
// MODELS
import User from "../user/model";
// INTERFACES
import { IDoctor } from "./interface";

const Doctor = User.discriminator(
    "Doctor",
    new Schema<IDoctor>({
        specialization: { type: String, required: true },
        address: { type: String },
        licenseNumber: { type: Number, required: true },
        clinic: { type: String },
        patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
        // FIXME: Esto lo ponemos en un nuevo modelo?
        consultations: [
            {
                consultationId: Schema.Types.ObjectId,
                patientId: Schema.Types.ObjectId,
                date: { type: Date, required: true },
                diagnosis: String,
                treatment: String,
                notes: String,
            },
        ],
    })
);

export default Doctor;

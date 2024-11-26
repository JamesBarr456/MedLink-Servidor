// LIBRARIES
import { Schema } from "mongoose";
// MODELS
import User from "../user/model";
// INTERFACES
import { IDoctor } from "./interface";
import { SPECIALITIES } from "../../constants/Specializations";

const Doctor = User.discriminator(
    "Doctor",
    new Schema<IDoctor>({
        specialization: [{ type: String, enum: SPECIALITIES, required: true }],
        licenseNumber: { type: Number, required: true },
        clinics: [{ type: Schema.Types.ObjectId, ref: "Clinic" }],
        patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
        skills: [{ type: String }],
        // FIXME: Esto lo ponemos en un nuevo modelo?
        // consultations: [
        //     {
        //         consultationId: Schema.Types.ObjectId,
        //         patientId: Schema.Types.ObjectId,
        //         date: { type: Date, required: true },
        //         diagnosis: String,
        //         treatment: String,
        //         notes: String,
        //     },
        // ],
    })
);

export default Doctor;

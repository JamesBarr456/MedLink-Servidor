import { model, Schema } from "mongoose";
import { IClinic } from "./interface";

const clinicSchema = new Schema<IClinic>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    openingHours: { type: String },
});

const Clinic = model<IClinic>("Clinic", clinicSchema);

export default Clinic;

import { Document } from "mongoose";

export interface IClinic extends Document {
    name: string;
    address: string;
    openingHours: string;
}

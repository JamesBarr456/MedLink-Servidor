import { model, Schema } from "mongoose";
import IDocument from "./interface";

const documentSchema = new Schema<IDocument>({
    url: { type: String },
    name: { type: String },
    type: { type: String },
    date: { type: Date },
});

const Document = model<IDocument>("Document", documentSchema);

export default Document;

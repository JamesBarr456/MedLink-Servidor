import { Document } from "mongoose";
import { ImageTypes } from "../../constants/ImageTypes";

export default interface IDocument extends Document {
    url: string;
    name: string;
    type: ImageTypes;
    date: Date;
}

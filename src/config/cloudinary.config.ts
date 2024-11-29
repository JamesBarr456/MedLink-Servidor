import { v2 as cloudinary } from "cloudinary";
import HttpError from "../utils/HttpError.utils";
import HTTP_STATUS from "../constants/HttpStatus";
import config from "./enviroment.config";

export default async function cloudinaryUploader(docPath: string) {
    try {
        cloudinary.config({
            cloud_name: config.CLOUDINARY_CLOUD_NAME,
            api_key: config.CLOUDINARY_API_KEY,
            api_secret: config.CLOUDINARY_API_SECRET,
        });

        const uploadResult = await cloudinary.uploader.upload(docPath);

        return uploadResult;
    } catch (err: any) {
        const error: HttpError = new HttpError(
            err.description || err.message,
            err.details || err.message,
            err.status || HTTP_STATUS.SERVER_ERROR
        );
        throw error;
    }
}

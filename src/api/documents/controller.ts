import { Request, Response } from "express";
import { MulterFiles } from "../../interfaces/file.interface";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import apiResponse from "../../utils/apiResponse.utils";
import DocumentsService from "./service";

export default class DocumentsController {
    static async add(req: Request, res: Response) {
        try {
            const { user } = res.locals;
            const files = req.files as MulterFiles;

            if (!files) {
                throw new HttpError(
                    "No files uploaded",
                    "No files uploaded",
                    HTTP_STATUS.BAD_REQUEST
                );
            }

            const patientUpdated =
                await DocumentsService.createOrUpdateDocuments(user, files);

            const response = apiResponse(true, patientUpdated);
            res.status(HTTP_STATUS.OK).json(response);
        } catch (err: any) {
            const response = apiResponse(
                false,
                new HttpError(
                    err.description || err.message,
                    err.details || err.message,
                    err.status || HTTP_STATUS.SERVER_ERROR
                )
            );
            res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
        }
    }
}

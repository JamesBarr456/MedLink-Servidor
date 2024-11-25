import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import { IContactForm } from "./interface";
import ContactService from "./service";

export default class ContactController {
    static async sendMail(req: Request, res: Response) {
        try {
            const mailContet: IContactForm = req.body;

            const generatedResponse = await ContactService.sendMail(mailContet);

            const response = apiResponse(true, generatedResponse);

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

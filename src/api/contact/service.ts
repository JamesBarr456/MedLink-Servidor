import config from "../../config/enviroment.config";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import MailSender from "../../utils/mailSender.utils";
import { IContactForm } from "./interface";

export default class ContactService {
    static async sendMail(
        mailContent: IContactForm
    ): Promise<{ message: String }> {
        try {
            const emailPayload = {
                from: mailContent.email,
                to: config.EMAIL_USERNAME!,
                subject: "Contact Form",
                text: `Name: ${mailContent.firstName} ${mailContent.lastName}\nEmail: ${mailContent.email}\nPhone: ${mailContent.phone}\nMessage: ${mailContent.message}`,
            };

            const emailSender = new MailSender(
                emailPayload.to,
                emailPayload.subject,
                emailPayload.text
            );

            const emailresult = await emailSender.sendMail();

            if (!emailresult) {
                throw new HttpError(
                    "Error sending email",
                    "ERROR_SENDING_EMAIL",
                    HTTP_STATUS.SERVER_ERROR
                );
            }

            return { message: "Mail sent successfully" };
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );
            throw error;
        }
    }
}

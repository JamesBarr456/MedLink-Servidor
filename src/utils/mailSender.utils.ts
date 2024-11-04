import nodemailer from "nodemailer";
import config from "../config/enviroment.config";

export default class MailSender {
    EMAIL_HOST = config.EMAIL_HOST;
    SERVICE_NAME = config.SERVICE_NAME;
    EMAIL_ADDRESS = config.EMAIL_USERNAME;
    EMAIL_PASSWORD = config.EMAIL_PASSWORD;
    EMAIL_PORT = config.EMAIL_PORT;

    private transporter = nodemailer.createTransport({
        service: this.EMAIL_HOST,
        host: this.EMAIL_HOST,
        secure: false,
        port: parseInt(this.EMAIL_PORT || "587"),
        auth: {
            user: this.EMAIL_ADDRESS,
            pass: this.EMAIL_PASSWORD,
        },
    });

    constructor(
        private userEmail: string,
        private subject: string,
        private html: string
    ) {
        this.transporter
            .verify()
            .then(() => {
                return;
            })
            .catch((error) => {
                throw new Error("Error confuring transporter: " + error);
            });
    }

    async sendMail() {
        try {
            const mailOptions = {
                to: this.userEmail,
                from: this.EMAIL_ADDRESS,
                subject: this.subject,
                html: this.html,
            };

            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            throw new Error("Error sending email: " + error);
        }
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const enviroment_config_1 = __importDefault(require("../config/enviroment.config"));
class MailSender {
    constructor(userEmail, subject, html) {
        this.userEmail = userEmail;
        this.subject = subject;
        this.html = html;
        this.EMAIL_HOST = enviroment_config_1.default.EMAIL_HOST;
        this.SERVICE_NAME = enviroment_config_1.default.SERVICE_NAME;
        this.EMAIL_ADDRESS = enviroment_config_1.default.EMAIL_USERNAME;
        this.EMAIL_PASSWORD = enviroment_config_1.default.EMAIL_PASSWORD;
        this.EMAIL_PORT = enviroment_config_1.default.EMAIL_PORT;
        this.transporter = nodemailer_1.default.createTransport({
            service: this.EMAIL_HOST,
            host: this.EMAIL_HOST,
            secure: false,
            port: parseInt(this.EMAIL_PORT || "587"),
            auth: {
                user: this.EMAIL_ADDRESS,
                pass: this.EMAIL_PASSWORD,
            },
        });
        this.transporter
            .verify()
            .then(() => {
            return;
        })
            .catch((error) => {
            throw new Error("Error confuring transporter: " + error);
        });
    }
    sendMail() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailOptions = {
                    to: this.userEmail,
                    from: this.EMAIL_ADDRESS,
                    subject: this.subject,
                    html: this.html,
                };
                yield this.transporter.sendMail(mailOptions);
                return true;
            }
            catch (error) {
                throw new Error("Error sending email: " + error);
            }
        });
    }
}
exports.default = MailSender;

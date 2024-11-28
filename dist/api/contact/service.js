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
const enviroment_config_1 = __importDefault(require("../../config/enviroment.config"));
const HttpStatus_1 = __importDefault(require("../../constants/HttpStatus"));
const HttpError_utils_1 = __importDefault(require("../../utils/HttpError.utils"));
const mailSender_utils_1 = __importDefault(require("../../utils/mailSender.utils"));
class ContactService {
    static sendMail(mailContent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailPayload = {
                    from: mailContent.email,
                    to: enviroment_config_1.default.EMAIL_USERNAME,
                    subject: "Contact Form",
                    text: `Name: ${mailContent.firstName} ${mailContent.lastName}\nEmail: ${mailContent.email}\nPhone: ${mailContent.phone}\nMessage: ${mailContent.message}`,
                };
                const emailSender = new mailSender_utils_1.default(emailPayload.to, emailPayload.subject, emailPayload.text);
                const emailresult = yield emailSender.sendMail();
                if (!emailresult) {
                    throw new HttpError_utils_1.default("Error sending email", "ERROR_SENDING_EMAIL", HttpStatus_1.default.SERVER_ERROR);
                }
                return { message: "Mail sent successfully" };
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
}
exports.default = ContactService;

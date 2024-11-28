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
const apiResponse_utils_1 = __importDefault(require("../../utils/apiResponse.utils"));
const HttpStatus_1 = __importDefault(require("../../constants/HttpStatus"));
const HttpError_utils_1 = __importDefault(require("../../utils/HttpError.utils"));
const service_1 = __importDefault(require("./service"));
class ContactController {
    static sendMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailContet = req.body;
                const generatedResponse = yield service_1.default.sendMail(mailContet);
                const response = (0, apiResponse_utils_1.default)(true, generatedResponse);
                res.status(HttpStatus_1.default.OK).json(response);
            }
            catch (err) {
                const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR));
                res.status(err.status || HttpStatus_1.default.SERVER_ERROR).json(response);
            }
        });
    }
}
exports.default = ContactController;

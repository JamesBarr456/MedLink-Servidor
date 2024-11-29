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
exports.default = cloudinaryUploader;
const cloudinary_1 = require("cloudinary");
const HttpError_utils_1 = __importDefault(require("../utils/HttpError.utils"));
const HttpStatus_1 = __importDefault(require("../constants/HttpStatus"));
const enviroment_config_1 = __importDefault(require("./enviroment.config"));
function cloudinaryUploader(docPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            cloudinary_1.v2.config({
                cloud_name: enviroment_config_1.default.CLOUDINARY_CLOUD_NAME,
                api_key: enviroment_config_1.default.CLOUDINARY_API_KEY,
                api_secret: enviroment_config_1.default.CLOUDINARY_API_SECRET,
            });
            const uploadResult = yield cloudinary_1.v2.uploader.upload(docPath);
            return uploadResult;
        }
        catch (err) {
            const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
            throw error;
        }
    });
}

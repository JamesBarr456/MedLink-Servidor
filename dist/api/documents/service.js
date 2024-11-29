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
const cloudinary_config_1 = __importDefault(require("../../config/cloudinary.config"));
const HttpStatus_1 = __importDefault(require("../../constants/HttpStatus"));
const PatientFields_1 = require("../../constants/PatientFields");
const HttpError_utils_1 = __importDefault(require("../../utils/HttpError.utils"));
const service_1 = __importDefault(require("../patient/service"));
const dao_1 = __importDefault(require("./dao"));
class DocumentsService {
    static createOrUpdateDocuments(user, files) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const documentPayload = yield Promise.all(files.studies.map((file) => __awaiter(this, void 0, void 0, function* () {
                    const documentURL = yield (0, cloudinary_config_1.default)(file.path);
                    return {
                        url: documentURL.secure_url,
                        name: file.originalname,
                        type: file.mimetype,
                        date: new Date(),
                    };
                })));
                const documentsSaved = yield dao_1.default.saveManyDocuments(documentPayload);
                const patientUpdated = yield service_1.default.addMedicalInformation(user, documentsSaved, PatientFields_1.PatientFields.DOCUMENTS);
                return patientUpdated;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
}
exports.default = DocumentsService;

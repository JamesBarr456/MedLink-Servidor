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
const HttpStatus_1 = __importDefault(require("../../constants/HttpStatus"));
const HttpError_utils_1 = __importDefault(require("../../utils/HttpError.utils"));
const service_1 = __importDefault(require("../doctor/service"));
const service_2 = __importDefault(require("../patient/service"));
const apiResponse_utils_1 = __importDefault(require("../../utils/apiResponse.utils"));
class AdminController {
    static getAllDoctors(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctors = yield service_1.default.getAllDoctors();
                const response = (0, apiResponse_utils_1.default)(true, doctors);
                res.status(HttpStatus_1.default.CREATED).json(response);
            }
            catch (err) {
                const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR));
                res.status(err.status || HttpStatus_1.default.SERVER_ERROR).json(response);
            }
        });
    }
    static getAllPatients(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patients = yield service_2.default.getAllPatients();
                const response = (0, apiResponse_utils_1.default)(true, patients);
                res.status(HttpStatus_1.default.CREATED).json(response);
            }
            catch (err) {
                const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR));
                res.status(err.status || HttpStatus_1.default.SERVER_ERROR).json(response);
            }
        });
    }
    static createDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctorData = req.body;
                const doctorResponse = yield service_1.default.createDoctor(doctorData);
                const response = (0, apiResponse_utils_1.default)(true, doctorResponse);
                res.status(HttpStatus_1.default.CREATED).json(response);
            }
            catch (err) {
                const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR));
                res.status(err.status || HttpStatus_1.default.SERVER_ERROR).json(response);
            }
        });
    }
}
exports.default = AdminController;

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
const service_1 = __importDefault(require("../doctor/service"));
const HttpStatus_1 = __importDefault(require("../../constants/HttpStatus"));
const HttpError_utils_1 = __importDefault(require("../../utils/HttpError.utils"));
const service_2 = __importDefault(require("../patient/service"));
const service_3 = __importDefault(require("../user/service"));
const apiResponse_utils_1 = __importDefault(require("../../utils/apiResponse.utils"));
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // FIXME: Check if the requester is an admin, and admit only admins to create users with roles
            try {
                let userResponse;
                if (req.body.licenseNumber) {
                    const doctorData = req.body;
                    userResponse = yield service_1.default.createDoctor(doctorData);
                }
                else {
                    const patientData = req.body;
                    userResponse = yield service_2.default.createPatient(patientData);
                }
                const response = (0, apiResponse_utils_1.default)(true, userResponse);
                res.status(HttpStatus_1.default.CREATED).json(response);
            }
            catch (err) {
                // FIXME: Replace with a next function and a logger?
                const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR));
                res.status(err.status || HttpStatus_1.default.SERVER_ERROR).json(response);
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const token = yield service_3.default.loginUser(userData);
                if (!token) {
                    throw new HttpError_utils_1.default("Invalid credentials", "INVALID_CREDENTIALS", HttpStatus_1.default.UNAUTHORIZED);
                }
                const response = (0, apiResponse_utils_1.default)(true, token);
                res.status(HttpStatus_1.default.OK).json(response);
            }
            catch (err) {
                const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR));
                res.status(err.status || HttpStatus_1.default.SERVER_ERROR).json(response);
            }
        });
    }
    static forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const generatedResponse = yield service_3.default.generetePasswordResetToken(email);
                const response = (0, apiResponse_utils_1.default)(true, generatedResponse);
                res.status(HttpStatus_1.default.OK).json(response);
            }
            catch (err) {
                const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR));
                res.status(err.status || HttpStatus_1.default.SERVER_ERROR).json(response);
            }
        });
    }
    static resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.params;
                const { password } = req.body;
                const passwordRestored = yield service_3.default.resetPassword(token, password);
                const response = (0, apiResponse_utils_1.default)(true, passwordRestored);
                res.status(HttpStatus_1.default.OK).json(response);
            }
            catch (err) {
                const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR));
                res.status(err.status || HttpStatus_1.default.SERVER_ERROR).json(response);
            }
        });
    }
    static updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = req.body;
                const { user } = res.locals;
                const passwordUpdated = yield service_3.default.updatePassword(user, password);
                const response = (0, apiResponse_utils_1.default)(true, passwordUpdated);
                res.status(HttpStatus_1.default.OK).json(response);
            }
            catch (err) {
                const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR));
                res.status(err.status || HttpStatus_1.default.SERVER_ERROR).json(response);
            }
        });
    }
}
exports.default = AuthController;

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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiResponse_utils_1 = __importDefault(require("../../utils/apiResponse.utils"));
const HttpStatus_1 = __importDefault(require("../../constants/HttpStatus"));
const HttpError_utils_1 = __importDefault(require("../../utils/HttpError.utils"));
const service_1 = __importDefault(require("./service"));
class PatientController {
    static getPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = res.locals;
                const patientId = req.params.id;
                const patient = yield service_1.default.getPatientById(patientId, user);
                const response = (0, apiResponse_utils_1.default)(true, patient);
                res.status(HttpStatus_1.default.OK).json(response);
            }
            catch (err) {
                const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR));
                res.status(err.status || HttpStatus_1.default.SERVER_ERROR).json(response);
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = res.locals;
                const updateFields = __rest(req.body, []);
                const files = req.files;
                if (files && files.avatar) {
                    updateFields.avatar = `/uploads/avatars/${files.avatar[0].filename}`;
                }
                const updatedUser = yield service_1.default.updatePatient(user, updateFields);
                const response = (0, apiResponse_utils_1.default)(true, updatedUser);
                res.status(HttpStatus_1.default.OK).json(response);
            }
            catch (err) {
                const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR));
                res.status(err.status || HttpStatus_1.default.SERVER_ERROR).json(response);
            }
        });
    }
    static authorizeDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = res.locals;
                const { token } = req.params;
                const updatedUser = yield service_1.default.authorizeDoctor(user, token);
                const response = (0, apiResponse_utils_1.default)(true, updatedUser);
                res.status(HttpStatus_1.default.OK).json(response);
            }
            catch (err) {
                const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR));
                res.status(err.status || HttpStatus_1.default.SERVER_ERROR).json(response);
            }
        });
    }
}
exports.default = PatientController;

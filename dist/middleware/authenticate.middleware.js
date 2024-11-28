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
exports.default = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpStatus_1 = __importDefault(require("../constants/HttpStatus"));
const HttpError_utils_1 = __importDefault(require("../utils/HttpError.utils"));
const apiResponse_utils_1 = __importDefault(require("../utils/apiResponse.utils"));
const enviroment_config_1 = __importDefault(require("../config/enviroment.config"));
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let token;
        if (!req.headers.authorization ||
            req.headers.authorization.indexOf("Bearer ") === -1) {
            const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default("Token is required", "TOKEN_REQUIRED", HttpStatus_1.default.UNAUTHORIZED));
            res.status(HttpStatus_1.default.UNAUTHORIZED).json(response);
            return;
        }
        token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.substring(7);
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, enviroment_config_1.default.JWT_SECRET);
            const tokenData = JSON.stringify(decodedToken);
            const user = JSON.parse(tokenData);
            res.locals.user = user;
            next();
        }
        catch (error) {
            const response = (0, apiResponse_utils_1.default)(false, new HttpError_utils_1.default("Invalid token", "INVALID_TOKEN", HttpStatus_1.default.UNAUTHORIZED));
            res.status(HttpStatus_1.default.UNAUTHORIZED).json(response);
            return;
        }
    });
}

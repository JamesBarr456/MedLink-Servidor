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
const bcrypt_utils_1 = require("../../utils/bcrypt.utils");
const jsonwebtoken_1 = require("jsonwebtoken");
const HttpError_utils_1 = __importDefault(require("../../utils/HttpError.utils"));
const dao_1 = __importDefault(require("./dao"));
const model_1 = __importDefault(require("./model"));
const resetToken_utils_1 = require("../../utils/resetToken.utils");
const enviroment_config_1 = __importDefault(require("../../config/enviroment.config"));
const mailSender_utils_1 = __importDefault(require("../../utils/mailSender.utils"));
class UserService {
    static loginUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDao = new dao_1.default(model_1.default);
                const userFound = yield userDao.find({
                    email: userData.email,
                });
                if (!userFound || userFound.length === 0) {
                    throw new HttpError_utils_1.default("Invalid credentials", "INVALID_CREDENTIALS", HttpStatus_1.default.UNAUTHORIZED);
                }
                const user = userFound[0];
                const isPasswordValid = bcrypt_utils_1.BcryptUtils.isValidPassword(user, userData.password);
                if (!isPasswordValid) {
                    throw new HttpError_utils_1.default("Invalid credentials", "INVALID_CREDENTIALS", HttpStatus_1.default.UNAUTHORIZED);
                }
                const token = (0, jsonwebtoken_1.sign)({
                    id: user._id,
                    role: user.role,
                    nbf: Math.floor(Date.now() / 1000),
                }, process.env.JWT_SECRET, { expiresIn: "1h" });
                return { token };
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
    static generetePasswordResetToken(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDao = new dao_1.default(model_1.default);
                const userFound = yield userDao.find({
                    email: mail,
                });
                if (!userFound || userFound.length === 0) {
                    throw new HttpError_utils_1.default("Invalid credentials", "INVALID_CREDENTIALS", HttpStatus_1.default.UNAUTHORIZED);
                }
                const user = userFound[0];
                const { token, expires } = (0, resetToken_utils_1.generetePasswordResetToken)();
                const userPayload = {
                    resetToken: token,
                    resetTokenExpires: expires,
                    updatedAt: new Date(),
                    updatedBy: user._id.toString(),
                };
                const userUpdated = yield userDao.update(user._id.toString(), userPayload);
                if (!userUpdated) {
                    throw new HttpError_utils_1.default("Error during token generation", "ERROR_GENERATING_TOKEN", HttpStatus_1.default.SERVER_ERROR);
                }
                const resetPasswordLink = `${enviroment_config_1.default.FRONTEND_URL}/reset-password/${token}`;
                const emailPayload = {
                    to: user.email,
                    subject: "Password reset",
                    html: `Click on the link to reset your password: <a href="${resetPasswordLink}"> Recuperar contraseña</a>`,
                };
                const emailSender = new mailSender_utils_1.default(emailPayload.to, emailPayload.subject, emailPayload.html);
                const emailresult = yield emailSender.sendMail();
                if (!emailresult) {
                    throw new HttpError_utils_1.default("Error sending email", "ERROR_SENDING_EMAIL", HttpStatus_1.default.SERVER_ERROR);
                }
                return {
                    message: "Token generated successfully and email sent",
                };
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
    static resetPassword(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDao = new dao_1.default(model_1.default);
                const userFound = yield userDao.find({
                    resetToken: token,
                    resetTokenExpires: { $gt: new Date() },
                });
                if (!userFound || userFound.length === 0) {
                    throw new HttpError_utils_1.default("Invalid credentials", "INVALID_CREDENTIALS", HttpStatus_1.default.UNAUTHORIZED);
                }
                const user = userFound[0];
                if (bcrypt_utils_1.BcryptUtils.isValidPassword(user, newPassword)) {
                    throw new HttpError_utils_1.default("Password is the same as the current one", "SAME_PASSWORD", HttpStatus_1.default.BAD_REQUEST);
                }
                const userPayload = {
                    password: bcrypt_utils_1.BcryptUtils.createHash(newPassword),
                    resetToken: undefined,
                    resetTokenExpires: undefined,
                    updatedAt: new Date(),
                    updatedBy: user._id.toString(),
                };
                const userUpdated = yield userDao.update(user._id.toString(), userPayload);
                if (!userUpdated) {
                    throw new HttpError_utils_1.default("Error during password reset", "ERROR_RESETING_PASSWORD", HttpStatus_1.default.SERVER_ERROR);
                }
                return {
                    message: "Password reset successfully",
                };
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDao = new dao_1.default(model_1.default);
                const user = yield userDao.read(id);
                if (!user) {
                    throw new HttpError_utils_1.default("User not found", "USER_NOT_FOUND", HttpStatus_1.default.NOT_FOUND);
                }
                return user;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
    static updatePassword(user, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDao = new dao_1.default(model_1.default);
                const currentUser = yield userDao.read(user.id);
                if (!currentUser) {
                    throw new HttpError_utils_1.default("User not found", "USER_NOT_FOUND", HttpStatus_1.default.NOT_FOUND);
                }
                if (bcrypt_utils_1.BcryptUtils.isValidPassword(currentUser, newPassword)) {
                    throw new HttpError_utils_1.default("Password is the same as the current one", "SAME_PASSWORD", HttpStatus_1.default.BAD_REQUEST);
                }
                const userPayload = {
                    password: bcrypt_utils_1.BcryptUtils.createHash(newPassword),
                    updatedAt: new Date(),
                    updatedBy: user.id,
                };
                const userUpdated = yield userDao.update(user.id, userPayload);
                if (!userUpdated) {
                    throw new HttpError_utils_1.default("Error during password update", "ERROR_UPDATING_PASSWORD", HttpStatus_1.default.SERVER_ERROR);
                }
                return {
                    message: "Password updated successfully",
                };
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
}
exports.default = UserService;

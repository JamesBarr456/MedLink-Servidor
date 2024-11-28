"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schemaValidators_middlewares_1 = __importDefault(require("../../middleware/schemaValidators.middlewares"));
const validator_1 = require("./validator");
const controller_1 = __importDefault(require("./controller"));
const authenticate_middleware_1 = __importDefault(require("../../middleware/authenticate.middleware"));
const authRouter = (0, express_1.Router)();
authRouter.post("/register", (0, schemaValidators_middlewares_1.default)(validator_1.userCreatePayloadValidator, null), controller_1.default.register);
authRouter.post("/login", (0, schemaValidators_middlewares_1.default)(validator_1.userLoginPayloadValidator, null), controller_1.default.login);
authRouter.post("/forgot-password", (0, schemaValidators_middlewares_1.default)(validator_1.userForgotPasswordPayloadValidator, null), controller_1.default.forgotPassword);
authRouter.post("/update-password", authenticate_middleware_1.default, (0, schemaValidators_middlewares_1.default)(validator_1.userResetPasswordPayloadValidator, null), controller_1.default.updatePassword);
authRouter.post("/reset-password/:token", (0, schemaValidators_middlewares_1.default)(validator_1.userResetPasswordPayloadValidator, validator_1.resetPasswordTokenValidator), controller_1.default.resetPassword);
exports.default = authRouter;

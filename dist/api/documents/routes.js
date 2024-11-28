"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_middleware_1 = __importDefault(require("../../middleware/authenticate.middleware"));
const authorization_middleware_1 = __importDefault(require("../../middleware/authorization.middleware"));
const Roles_1 = require("../../constants/Roles");
const uploadFields_middlewares_1 = require("../../middleware/uploadFields.middlewares");
const controller_1 = __importDefault(require("./controller"));
const documentsRouter = (0, express_1.Router)();
documentsRouter.put("/", authenticate_middleware_1.default, (0, authorization_middleware_1.default)([Roles_1.Roles.PATIENT, Roles_1.Roles.ADMIN]), uploadFields_middlewares_1.uploadFields, controller_1.default.add);
exports.default = documentsRouter;

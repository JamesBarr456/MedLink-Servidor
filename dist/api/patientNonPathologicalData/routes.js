"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_middleware_1 = __importDefault(require("../../middleware/authenticate.middleware"));
const authorization_middleware_1 = __importDefault(require("../../middleware/authorization.middleware"));
const schemaValidators_middlewares_1 = __importDefault(require("../../middleware/schemaValidators.middlewares"));
const Roles_1 = require("../../constants/Roles");
const controller_1 = __importDefault(require("./controller"));
const validator_1 = require("./validator");
const patientNonPathologicalDataRouter = (0, express_1.Router)();
patientNonPathologicalDataRouter.put("/", authenticate_middleware_1.default, (0, authorization_middleware_1.default)([Roles_1.Roles.PATIENT, Roles_1.Roles.ADMIN]), (0, schemaValidators_middlewares_1.default)(validator_1.patientNonPathologicalDataPayloadValidator, null), controller_1.default.add);
exports.default = patientNonPathologicalDataRouter;

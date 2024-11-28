"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_middleware_1 = __importDefault(require("../../middleware/authenticate.middleware"));
const authorization_middleware_1 = __importDefault(require("../../middleware/authorization.middleware"));
const Roles_1 = require("../../constants/Roles");
const controller_1 = __importDefault(require("./controller"));
const schemaValidators_middlewares_1 = __importDefault(require("../../middleware/schemaValidators.middlewares"));
const validator_1 = require("./validator");
const uploadFields_middlewares_1 = require("../../middleware/uploadFields.middlewares");
const idValidator_1 = require("../../generalValidator/idValidator");
const patientRouter = (0, express_1.Router)();
patientRouter.get("/:id", authenticate_middleware_1.default, (0, authorization_middleware_1.default)([Roles_1.Roles.PATIENT, Roles_1.Roles.DOCTOR, Roles_1.Roles.ADMIN]), (0, schemaValidators_middlewares_1.default)(null, idValidator_1.mongoIdValidator), controller_1.default.getPatient);
patientRouter.put("/", authenticate_middleware_1.default, (0, authorization_middleware_1.default)([Roles_1.Roles.PATIENT, Roles_1.Roles.ADMIN]), (0, schemaValidators_middlewares_1.default)(validator_1.patientUpdatePayloadValidator, null), uploadFields_middlewares_1.uploadFields, controller_1.default.update);
patientRouter.post("/authorize-doctor/:token", authenticate_middleware_1.default, (0, authorization_middleware_1.default)([Roles_1.Roles.PATIENT]), (0, schemaValidators_middlewares_1.default)(null, validator_1.authorizeDoctorPayloadValidator), controller_1.default.authorizeDoctor);
exports.default = patientRouter;

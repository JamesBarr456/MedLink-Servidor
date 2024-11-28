"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const authorization_middleware_1 = __importDefault(require("../../middleware/authorization.middleware"));
const schemaValidators_middlewares_1 = __importDefault(require("../../middleware/schemaValidators.middlewares"));
const Roles_1 = require("../../constants/Roles");
const authenticate_middleware_1 = __importDefault(require("../../middleware/authenticate.middleware"));
const validator_1 = require("../auth/validator");
const adminRouter = (0, express_1.Router)();
adminRouter.get("/doctors", controller_1.default.getAllDoctors);
adminRouter.post("/doctors", authenticate_middleware_1.default, (0, authorization_middleware_1.default)([Roles_1.Roles.ADMIN]), (0, schemaValidators_middlewares_1.default)(validator_1.userCreatePayloadValidator, null), controller_1.default.createDoctor);
// adminRouter.delete(
//     "/doctors/:id",
//     authenticate,
//     authorizeRoles([Roles.ADMIN]),
//     schemaValidator(null, mongoIdValidator),
//     AdminController.deleteDoctor
// );
adminRouter.get("/patients", authenticate_middleware_1.default, (0, authorization_middleware_1.default)([Roles_1.Roles.ADMIN]), controller_1.default.getAllPatients);
exports.default = adminRouter;

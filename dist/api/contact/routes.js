"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schemaValidators_middlewares_1 = __importDefault(require("../../middleware/schemaValidators.middlewares"));
const validator_1 = require("./validator");
const controller_1 = __importDefault(require("./controller"));
const contactRouter = (0, express_1.Router)();
contactRouter.post("/", (0, schemaValidators_middlewares_1.default)(validator_1.contactFormValidator, null), controller_1.default.sendMail);
exports.default = contactRouter;

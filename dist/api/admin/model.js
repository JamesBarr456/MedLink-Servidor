"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LIBRARIES
const mongoose_1 = require("mongoose");
// MODELS
const model_1 = __importDefault(require("../user/model"));
const Admin = model_1.default.discriminator("Admin", new mongoose_1.Schema({
    permissions: [{ type: String }],
}));
exports.default = Admin;

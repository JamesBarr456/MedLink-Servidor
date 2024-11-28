"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// MODELS
const model_1 = __importDefault(require("../admin/model"));
// DAOS
const dao_1 = __importDefault(require("../user/dao"));
class AdminDAO extends dao_1.default {
    constructor() {
        super(model_1.default);
    }
}
exports.default = AdminDAO;

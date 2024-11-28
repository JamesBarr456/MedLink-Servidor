"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFields = void 0;
// UTILS
const uploadFiles_utils_1 = __importDefault(require("../utils/uploadFiles.utils"));
exports.uploadFields = uploadFiles_utils_1.default.fields([
    { name: "avatar", maxCount: 1 },
    { name: "studies", maxCount: 10 },
]);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LIBRARIES
const multer_1 = __importDefault(require("multer"));
// UTILS
const path_utils_1 = require("./path.utils");
const storage = multer_1.default.diskStorage({
    destination: (_req, file, cb) => {
        if (file.fieldname === "avatar") {
            cb(null, path_utils_1.rootPath + "/public/uploads/avatars");
        }
        else if (file.fieldname === "studies") {
            cb(null, path_utils_1.rootPath + "/public/uploads/studies");
        }
        else {
            cb(null, path_utils_1.rootPath + "/public/uploads/others");
        }
    },
    filename: (_req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname
            .replace(/\s/g, "-")
            .toLowerCase()}`);
    },
});
const fileUploader = (0, multer_1.default)({ storage });
exports.default = fileUploader;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootPath = void 0;
// LIBRARIES
const path_1 = require("path");
const currentFilePath = __filename;
const currentDir = (0, path_1.dirname)(currentFilePath);
const rootPath = (0, path_1.resolve)(currentDir, "../");
exports.rootPath = rootPath;

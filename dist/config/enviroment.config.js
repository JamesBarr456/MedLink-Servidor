"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// LIBRARIES
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const config = {
    PORT: process.env.PORT || "3000",
    BACKPORT: process.env.BACKPORT || "8081",
    MONGO_URI: process.env.MONGO_URI || "",
    DATABASE: process.env.DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    ADMIN_NAME: process.env.ADMIN_NAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    DATA_SOURCE: process.env.DATA_SOURCE || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    SESSION_KEY: process.env.SESSION_KEY || "",
    EMAIL_HOST: process.env.EMAIL_HOST || "",
    SERVICE_NAME: process.env.SERVICE_NAME || "",
    EMAIL_USERNAME: process.env.EMAIL_USERNAME || "",
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
    EMAIL_PORT: process.env.EMAIL_PORT || "",
    TEST_DATABASE: process.env.TEST_DATABASE,
    NODE_ENV: process.env.NODE_ENV || "dev",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
    CLOUDINARY_URL: process.env.CLOUDINARY_URL || "",
};
exports.default = config;

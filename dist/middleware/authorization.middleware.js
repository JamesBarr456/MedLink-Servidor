"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiResponse_utils_1 = __importDefault(require("../utils/apiResponse.utils"));
const HttpStatus_1 = __importDefault(require("../constants/HttpStatus"));
const authorizeRoles = (roles) => {
    return (_req, res, next) => {
        const userRole = res.locals.user.role;
        if (roles.includes(userRole)) {
            res.locals.user.role = userRole;
            next();
        }
        else {
            const response = (0, apiResponse_utils_1.default)(false, {
                message: "You are not authorized to access this resource",
            });
            res.status(HttpStatus_1.default.FORBIDDEN).json(response);
        }
    };
};
exports.default = authorizeRoles;

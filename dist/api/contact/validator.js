"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFormValidator = void 0;
const zod_1 = require("zod");
exports.contactFormValidator = zod_1.z.object({
    firstName: zod_1.z.string().min(2).max(255).trim(),
    lastName: zod_1.z.string().min(2).max(255).trim(),
    email: zod_1.z.string().email().trim(),
    phone: zod_1.z.string().min(10).max(15).trim().optional(),
    message: zod_1.z.string().min(10).max(1000).trim(),
});

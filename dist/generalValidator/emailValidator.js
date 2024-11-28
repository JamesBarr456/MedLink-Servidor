"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidator = void 0;
const zod_1 = require("zod");
exports.emailValidator = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email" }),
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clinicSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    openingHours: { type: String },
});
const Clinic = (0, mongoose_1.model)("Clinic", clinicSchema);
exports.default = Clinic;

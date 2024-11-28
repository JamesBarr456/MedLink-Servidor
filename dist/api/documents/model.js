"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const documentSchema = new mongoose_1.Schema({
    url: { type: String },
    name: { type: String },
    type: { type: String },
    date: { type: Date },
});
const Document = (0, mongoose_1.model)("Document", documentSchema);
exports.default = Document;

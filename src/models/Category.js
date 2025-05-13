"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
}, { timestamps: true });
exports.default = mongoose_1.models.Category || (0, mongoose_1.model)("Category", CategorySchema);

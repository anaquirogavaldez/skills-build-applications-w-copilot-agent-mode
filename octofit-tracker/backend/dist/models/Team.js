"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    captain: { type: String, default: '' },
    members: [{ type: String, trim: true }],
    points: { type: Number, default: 0 }
}, { timestamps: true });
exports.Team = mongoose_1.default.model('Team', teamSchema);

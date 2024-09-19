"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.todoSchema = zod_1.default.object({
    title: zod_1.default.string().min(1).max(400),
    description: zod_1.default.string().optional(),
});

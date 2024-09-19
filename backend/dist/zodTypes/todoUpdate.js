"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoUpdateSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.todoUpdateSchema = zod_1.default
    .object({
    id: zod_1.default.number(),
    title: zod_1.default.string().min(1).optional(),
    description: zod_1.default.string().optional(),
})
    .refine((data) => data.title !== undefined || data.description !== undefined, {
    message: "provide title or description",
    path: ["title", "description"],
});

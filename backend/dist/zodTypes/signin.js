"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signinSchema = zod_1.default.object({
    username: zod_1.default.string().min(1).max(250),
    password: zod_1.default.string().min(6).max(250),
});

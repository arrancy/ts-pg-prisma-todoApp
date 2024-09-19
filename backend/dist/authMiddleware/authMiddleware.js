"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
function authMiddleware(req, res, next) {
    console.log("request till here");
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(411).json({ msg: "empty credentials" });
    }
    if (!JWT_SECRET) {
        return res.status(500).json({ msg: "JWT_SECRET not configured" });
    }
    try {
        const recieved = authHeader.slice(7);
        const decoded = jsonwebtoken_1.default.verify(recieved, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            msg: "unauthorised",
        });
    }
}

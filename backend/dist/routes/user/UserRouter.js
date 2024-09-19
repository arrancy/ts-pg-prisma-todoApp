"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.statusCodes = void 0;
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const signup_1 = require("../../zodTypes/signup");
const signin_1 = require("../../zodTypes/signin");
const client_1 = require("@prisma/client");
const todo_1 = require("./todo/todo");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
var statusCodes;
(function (statusCodes) {
    statusCodes[statusCodes["invalidInputs"] = 403] = "invalidInputs";
    statusCodes[statusCodes["serverSideError"] = 500] = "serverSideError";
    statusCodes[statusCodes["ok"] = 200] = "ok";
    statusCodes[statusCodes["notFound"] = 404] = "notFound";
    statusCodes[statusCodes["alreadyExists"] = 409] = "alreadyExists";
    statusCodes[statusCodes["wrongCredentials"] = 401] = "wrongCredentials";
})(statusCodes || (exports.statusCodes = statusCodes = {}));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.use("/todo", todo_1.todoRouter);
exports.userRouter.use(express_2.default.json());
const prisma = new client_1.PrismaClient();
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signup_1.signupSchema.safeParse(req.body);
    if (!success) {
        return res
            .status(statusCodes.invalidInputs)
            .json({ msg: "invalid inputs" });
    }
    const alreadyExists = yield prisma.user.findFirst({
        where: { username: req.body.username },
    });
    if (alreadyExists) {
        return res
            .status(statusCodes.alreadyExists)
            .json({ msg: "username already exists" });
    }
    const newUser = yield prisma.user.create({
        data: req.body,
    });
    const userId = newUser.id;
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        return res
            .status(statusCodes.serverSideError)
            .json({ msg: "internal server error" });
    }
    const token = jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET);
    res.status(statusCodes.ok).json({ msg: "user created successfully", token });
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signin_1.signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(statusCodes.invalidInputs).json({
            msg: "invalid inputs",
        });
    }
    const validUser = yield prisma.user.findFirst({
        where: { username: req.body.username, password: req.body.password },
    });
    if (!validUser) {
        return res.status(statusCodes.wrongCredentials).json({
            msg: "invalid username/password",
        });
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        return res
            .status(statusCodes.serverSideError)
            .json({ msg: "an error occured" });
    }
    try {
        const { id } = validUser;
        const token = jsonwebtoken_1.default.sign({ id }, JWT_SECRET);
        res.status(statusCodes.ok).json({ msg: "signed in successfully", token });
    }
    catch (error) {
        console.log(error);
        res.status(statusCodes.serverSideError).json({ msg: "an error occured" });
    }
}));

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../../authMiddleware/authMiddleware");
const client_1 = require("@prisma/client");
const todo_1 = require("../../../zodTypes/todo");
const todoUpdate_1 = require("../../../zodTypes/todoUpdate");
const UserRouter_1 = require("../UserRouter");
const todoDeleteSchema_1 = require("../../../zodTypes/todoDeleteSchema");
exports.todoRouter = (0, express_1.Router)();
exports.todoRouter.use(authMiddleware_1.authMiddleware);
// todoRouter.use(express.json());
const prisma = new client_1.PrismaClient();
exports.todoRouter.get("/test", (req, res) => {
    res.send("Middleware works!");
});
exports.todoRouter.post("/", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { success } = todo_1.todoSchema.safeParse(req.body);
    if (!success) {
        return res.status(UserRouter_1.statusCodes.invalidInputs).json({
            msg: "invalid inputs/empty todo",
        });
    }
    try {
        const todo = yield prisma.todo.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                user_id: userId,
            },
        });
        const todoId = todo.id;
        res
            .status(UserRouter_1.statusCodes.ok)
            .json({ msg: "todo created successfully ", todoId });
    }
    catch (error) {
        console.log(error);
        res.status(UserRouter_1.statusCodes.serverSideError).json({ msg: "an error occured" });
    }
}));
exports.todoRouter.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = todoUpdate_1.todoUpdateSchema.safeParse(req.body);
    if (!success) {
        return res
            .status(UserRouter_1.statusCodes.invalidInputs)
            .json({ msg: "invalid inputs" });
    }
    const todoExists = yield prisma.todo.findUnique({
        where: {
            id: req.body.id,
            user_id: req.user.id,
        },
    });
    if (!todoExists) {
        return res.status(UserRouter_1.statusCodes.notFound).json({
            msg: "todo not found/does not belong",
        });
    }
    try {
        const updatedTodo = yield prisma.todo.update({
            where: {
                id: req.body.id,
            },
            data: { title: req.body.title, description: req.body.description },
        });
        res
            .status(UserRouter_1.statusCodes.ok)
            .json({ msg: "todo updated successfully", updatedTodo });
    }
    catch (error) {
        return res
            .status(UserRouter_1.statusCodes.serverSideError)
            .json({ msg: "internal server error" });
    }
}));
exports.todoRouter.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = todoDeleteSchema_1.todoDeleteSchema.safeParse(req.body);
    if (!success) {
        return res
            .status(UserRouter_1.statusCodes.invalidInputs)
            .json({ msg: "invalid inputs" });
    }
    const todoExists = yield prisma.todo.findFirst({
        where: {
            id: req.body.id,
        },
    });
    if (!todoExists) {
        return res.status(UserRouter_1.statusCodes.invalidInputs).json({
            msg: "the todo does not exist already.",
        });
    }
    try {
        const deleteTodo = yield prisma.todo.delete({
            where: {
                id: req.body.id,
                user_id: req.user.id,
            },
        });
        res.status(UserRouter_1.statusCodes.ok).json({ msg: "todo deleted" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(UserRouter_1.statusCodes.serverSideError)
            .json({ msg: "internal server error" });
    }
}));
exports.todoRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    try {
        const todos = yield prisma.todo.findMany({
            where: { user_id: userId },
        });
        if (!todos) {
            return res.status(UserRouter_1.statusCodes.notFound).json({
                msg: "404 not found",
            });
        }
        res.status(UserRouter_1.statusCodes.ok).json({
            todos,
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(UserRouter_1.statusCodes.serverSideError)
            .json({ msg: "an error occured" });
    }
}));

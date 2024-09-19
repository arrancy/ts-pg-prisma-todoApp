"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const UserRouter_1 = require("./user/UserRouter");
exports.rootRouter = (0, express_1.Router)();
exports.rootRouter.use("/user", UserRouter_1.userRouter);

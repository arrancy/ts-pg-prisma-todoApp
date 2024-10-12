"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const rootRouter_1 = require("./routes/rootRouter");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", rootRouter_1.rootRouter);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("the app is running on " + PORT);
});

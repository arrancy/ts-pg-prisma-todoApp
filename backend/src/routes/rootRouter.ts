import { Router } from "express";
import { userRouter } from "./user/UserRouter";
export const rootRouter = Router();
rootRouter.use("/user", userRouter);

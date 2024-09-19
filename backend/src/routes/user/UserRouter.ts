import { Router, Request, Response } from "express";
import express from "express";
import { signupSchema } from "../../zodTypes/signup";
import { signinSchema } from "../../zodTypes/signin";
import { PrismaClient } from "@prisma/client";
import { todoRouter } from "./todo/todo";
import { authMiddleware } from "../../authMiddleware/authMiddleware";
import jwt from "jsonwebtoken";
import "dotenv/config";

export enum statusCodes {
  invalidInputs = 403,
  serverSideError = 500,
  ok = 200,
  notFound = 404,
  alreadyExists = 409,
  wrongCredentials = 401,
}

export const userRouter = Router();
userRouter.use("/todo", todoRouter);
userRouter.use(express.json());
const prisma = new PrismaClient();
userRouter.post("/signup", async (req: Request, res: Response) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res
      .status(statusCodes.invalidInputs)
      .json({ msg: "invalid inputs" });
  }
  const alreadyExists = await prisma.user.findFirst({
    where: { username: req.body.username },
  });
  if (alreadyExists) {
    return res
      .status(statusCodes.alreadyExists)
      .json({ msg: "username already exists" });
  }
  const newUser = await prisma.user.create({
    data: req.body,
  });
  const userId = newUser.id;
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return res
      .status(statusCodes.serverSideError)
      .json({ msg: "internal server error" });
  }
  const token = jwt.sign({ id: userId }, JWT_SECRET);
  res.status(statusCodes.ok).json({ msg: "user created successfully", token });
});

userRouter.post("/signin", async (req: Request, res: Response) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(statusCodes.invalidInputs).json({
      msg: "invalid inputs",
    });
  }
  const validUser = await prisma.user.findFirst({
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
    const token = jwt.sign({ id }, JWT_SECRET);
    res.status(statusCodes.ok).json({ msg: "signed in successfully", token });
  } catch (error) {
    console.log(error);
    res.status(statusCodes.serverSideError).json({ msg: "an error occured" });
  }
});

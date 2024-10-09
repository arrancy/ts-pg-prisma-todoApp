import { Request, Response, Router } from "express";
import express from "express";
import { authMiddleware } from "../../../authMiddleware/authMiddleware";
import { PrismaClient } from "@prisma/client";
import { CustomRequest } from "../../../authMiddleware/authMiddleware";
import { todoSchema } from "../../../zodTypes/todo";
import { todoUpdateSchema } from "../../../zodTypes/todoUpdate";
import { statusCodes } from "../UserRouter";
import { todoDeleteSchema } from "../../../zodTypes/todoDeleteSchema";
export const todoRouter = Router();
todoRouter.use(authMiddleware);
// todoRouter.use(express.json());
const prisma = new PrismaClient();
todoRouter.get("/test", (req: Request, res: Response) => {
  res.send("Middleware works!");
});
todoRouter.post("/", authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as CustomRequest).user.id;
  const { success } = todoSchema.safeParse(req.body);
  if (!success) {
    return res.status(statusCodes.invalidInputs).json({
      msg: "invalid inputs/empty todo",
    });
  }
  try {
    const todo = await prisma.todo.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        user_id: userId,
      },
    });
    const todoId = todo.id;
    res
      .status(statusCodes.ok)
      .json({ msg: "todo created successfully ", todoId });
  } catch (error) {
    console.log(error);
    res.status(statusCodes.serverSideError).json({ msg: "an error occured" });
  }
});
todoRouter.put("/done", authMiddleware, async (req: Request, res: Response) => {
  const { success } = todoUpdateSchema.safeParse(req.body);
  if (!success) {
    return res
      .status(statusCodes.invalidInputs)
      .json({ msg: "invalid inputs" });
  }
  const todoExists = await prisma.todo.findUnique({
    where: {
      id: req.body.id,
      user_id: (req as CustomRequest).user.id,
    },
  });
  if (!todoExists) {
    return res.status(statusCodes.notFound).json({
      msg: "todo not found/does not belong",
    });
  }
  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: req.body.id,
        user_id: (req as CustomRequest).user.id,
      },
      data: {
        done: true,
      },
    });
    res.status(statusCodes.ok).json({ msg: "todo marked as done." });
  } catch (error) {
    console.log(error);
    return res
      .status(statusCodes.serverSideError)
      .json({ msg: "unknown error occured" });
  }
});
todoRouter.put("/", async (req: Request, res: Response) => {
  const { success } = todoUpdateSchema.safeParse(req.body);
  if (!success) {
    return res
      .status(statusCodes.invalidInputs)
      .json({ msg: "invalid inputs" });
  }
  const todoExists = await prisma.todo.findUnique({
    where: {
      id: req.body.id,
      user_id: (req as CustomRequest).user.id,
    },
  });
  if (!todoExists) {
    return res.status(statusCodes.notFound).json({
      msg: "todo not found/does not belong",
    });
  }
  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: req.body.id,
      },
      data: { title: req.body.title, description: req.body.description },
    });
    res
      .status(statusCodes.ok)
      .json({ msg: "todo updated successfully", updatedTodo });
  } catch (error) {
    return res
      .status(statusCodes.serverSideError)
      .json({ msg: "internal server error" });
  }
});
todoRouter.delete("/", async (req: Request, res: Response) => {
  const { success } = todoDeleteSchema.safeParse(req.body);
  if (!success) {
    return res
      .status(statusCodes.invalidInputs)
      .json({ msg: "invalid inputs" });
  }
  const todoExists = await prisma.todo.findFirst({
    where: {
      id: req.body.id,
    },
  });

  if (!todoExists) {
    return res.status(statusCodes.invalidInputs).json({
      msg: "the todo does not exist already.",
    });
  }
  try {
    const deleteTodo = await prisma.todo.delete({
      where: {
        id: req.body.id,
        user_id: (req as CustomRequest).user.id,
      },
    });
    res.status(statusCodes.ok).json({ msg: "todo deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(statusCodes.serverSideError)
      .json({ msg: "internal server error" });
  }
});
todoRouter.get("/", async (req: Request, res: Response) => {
  const userId = (req as CustomRequest).user.id;
  try {
    const todos = await prisma.todo.findMany({
      where: { user_id: userId },
    });
    if (!todos) {
      return res.status(statusCodes.notFound).json({
        msg: "404 not found",
      });
    }

    res.status(statusCodes.ok).json({
      todos,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(statusCodes.serverSideError)
      .json({ msg: "an error occured" });
  }
});

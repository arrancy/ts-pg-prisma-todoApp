import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

import "dotenv/config";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export interface CustomRequest extends Request {
  user: JwtPayload;
}
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
    const decoded = jwt.verify(recieved, JWT_SECRET) as JwtPayload;

    (req as CustomRequest).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "unauthorised",
    });
  }
}

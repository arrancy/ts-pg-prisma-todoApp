import "dotenv/config";
import express, { Express, Request, Response } from "express";
import { rootRouter } from "./routes/rootRouter";
import jwt from "jsonwebtoken";
import cors from "cors";
import { authMiddleware } from "./authMiddleware/authMiddleware";
import { statusCodes } from "./routes/user/UserRouter";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);
app.get("/me", (req: Request, res: Response) => {
  console.log("request reached here");
  if (!req.headers.authorization) {
    return res.status(401).json({
      isLoggedIn: false,
      msg: "unauthorised",
    });
  }

  try {
    const authHeader = req.headers.authorization;
    const receivedToken = authHeader.slice(7, authHeader.length);
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        isLoggedIn: false,
        msg: "server side error ",
      });
    }
    const decoded = jwt.verify(receivedToken, process.env.JWT_SECRET);
    return res.status(200).json({
      isLoggedIn: true,
      msg: "authorised",
    });
  } catch (error) {
    return res.status(statusCodes.wrongCredentials).json({
      isLoggedIn: false,
      msg: "unauthorized",
    });
  }
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("the app is running on " + PORT);
});

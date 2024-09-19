import "dotenv/config";
import express, { Express } from "express";
import { rootRouter } from "./routes/rootRouter";

const app: Express = express();
app.use(express.json());
app.use("/api/v1", rootRouter);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("the app is running on " + PORT);
});

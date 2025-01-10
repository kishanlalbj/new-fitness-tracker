import express from "express";
import morgan from "morgan";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import healthStatRouter from "./routes/healthStatRouter.js";
import userRouter from "./routes/usersRouter.js";
import { Database } from "./db/Database.js";

const db = new Database(process.env.MONGO_URI);

(async () => {
  await db.connect();
})();

import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "dist")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/health-stats", healthStatRouter);
app.use("/api/v1/auth", userRouter);

app.use(errorHandler);
app.use(notFound);

process.on("SIGINT", async () => {
  await db.disconnect();
  process.exit(0);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started at port 🚀", PORT);
});

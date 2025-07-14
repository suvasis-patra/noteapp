import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.route";
import notesRouter from "./routes/notes.route";
import bookmarksRouter from "./routes/bookmark.route";

import { errorHandler } from "./controllers/error.controller";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/bookmarks", bookmarksRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

export { app };

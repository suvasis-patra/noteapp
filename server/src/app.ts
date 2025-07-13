import express from "express";
import cookieParser from "cookie-parser";

import notesRouter from "./routes/notes.route";
import bookmarksRouter from "./routes/bookmark.route";
import { errorHandler } from "./controllers/error.controller";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/notes", notesRouter);
// app.use("/api/v1/bookmarks", bookmarksRouter);

app.use(errorHandler);

export { app };

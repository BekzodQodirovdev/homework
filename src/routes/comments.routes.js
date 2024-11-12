import { Router } from "express";
import {
  addcommentsCon,
  deleteOnecommentsCon,
  getAllcommentsCon,
  getOnecommentsCon,
  updateOnecommentsCon,
} from "../controllers/index.js";
import {
  commentsGuard,
  roleGuard,
  commentsCheck,
} from "../middleware/index.js";

export const commentsRouter = new Router();

commentsRouter.get("/", commentsGuard, getAllcommentsCon);
commentsRouter.post(
  "/",
  commentsGuard,
  roleGuard(["admin"]),
  commentsCheck,
  addcommentsCon
);
commentsRouter.get("/:id", commentsGuard, getOnecommentsCon);
commentsRouter.put(
  "/:id",
  commentsGuard,
  roleGuard(["admin"]),
  updateOnecommentsCon
);
commentsRouter.delete(
  "/:id",
  commentsGuard,
  roleGuard(["admin"]),
  deleteOnecommentsCon
);

import { Router } from "express";
import {
  addArticlesCon,
  deleteOneArticlesCon,
  getAllArticlesCon,
  getOneArticlesCon,
  updateOneArticlesCon,
} from "../controllers/index.js";
import { artclsGuard, artclesCheck } from "../middleware/index.js";

export const articlesRouter = new Router();

articlesRouter.get("/", artclsGuard, getAllArticlesCon);
articlesRouter.post("/", artclsGuard, artclesCheck, addArticlesCon);
articlesRouter.get("/:id", artclsGuard, getOneArticlesCon);
articlesRouter.put("/:id", artclsGuard, updateOneArticlesCon);
articlesRouter.delete("/:id", artclsGuard, deleteOneArticlesCon);

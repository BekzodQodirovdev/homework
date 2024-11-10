import { Router } from "express";
import {
  addCategoryCon,
  deleteOneCategoryCon,
  getAllCategoryCon,
  getOneCategoryCon,
  updateOneCategoryCon,
} from "../controllers/index.js";
import {
  categoryGuard,
  roleGuard,
  categoryCheck,
} from "../middleware/index.js";

export const categoryRouter = new Router();

categoryRouter.get("/", categoryGuard, getAllCategoryCon);
categoryRouter.post(
  "/",
  categoryGuard,
  roleGuard(["admin"]),
  categoryCheck,
  addCategoryCon
);
categoryRouter.get("/:id", categoryGuard, getOneCategoryCon);
categoryRouter.put(
  "/:id",
  categoryGuard,
  roleGuard(["admin"]),
  updateOneCategoryCon
);
categoryRouter.delete(
  "/:id",
  categoryGuard,
  roleGuard(["admin"]),
  deleteOneCategoryCon
);

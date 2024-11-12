import { Router } from "express";
import {
  addcoursesCon,
  deleteOnecoursesCon,
  getAllcoursesCon,
  getOnecoursesCon,
  updateOnecoursesCon,
} from "../controllers/index.js";
import { coursesGuard, roleGuard, coursesCheck } from "../middleware/index.js";

export const coursesRouter = new Router();

coursesRouter.get("/", coursesGuard, getAllcoursesCon);
coursesRouter.post(
  "/",
  coursesGuard,
  roleGuard(["admin"]),
  coursesCheck,
  addcoursesCon
);
coursesRouter.get("/:id", coursesGuard, getOnecoursesCon);
coursesRouter.put(
  "/:id",
  coursesGuard,
  roleGuard(["admin"]),
  updateOnecoursesCon
);
coursesRouter.delete(
  "/:id",
  coursesGuard,
  roleGuard(["admin"]),
  deleteOnecoursesCon
);

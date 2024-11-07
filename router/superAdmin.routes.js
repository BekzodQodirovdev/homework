import { Router } from "express";
import { checkUser } from "../middleware/checkuser.helpers.js";
import {
  createSuperAdminCon,
  deleteSuperAdminCon,
  getSuperAdminCon,
  getByIdSuperAdminCon,
  updateSuperAdminCon,
} from "../controller/index.js";
export const userRouter = Router();

export const SuperAdminRouter = Router();

SuperAdminRouter.post("/",checkUser, createSuperAdminCon);
SuperAdminRouter.get("/", checkUser, getSuperAdminCon);
SuperAdminRouter.get("/:id", checkUser, getByIdSuperAdminCon);
SuperAdminRouter.put("/:id", checkUser ,updateSuperAdminCon);
SuperAdminRouter.delete("/:id", checkUser ,deleteSuperAdminCon);

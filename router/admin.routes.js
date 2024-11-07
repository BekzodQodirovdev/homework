import { Router } from "express";
import {
  createAdminCon,
  deleteAdminCon,
  getAdminCon,
  getByIdAdminCon,
  updateAdminCon,
} from "../controller/index.js";
import { checkUser } from "../middleware/checkuser.helpers.js";
export const userRouter = Router();

export const AdminRouter = Router();

AdminRouter.get("/",checkUser, getAdminCon);
AdminRouter.post("/",checkUser, createAdminCon);
AdminRouter.get("/:id",checkUser, getByIdAdminCon);
AdminRouter.put("/:id",checkUser, updateAdminCon);
AdminRouter.delete("/:id",checkUser, deleteAdminCon);

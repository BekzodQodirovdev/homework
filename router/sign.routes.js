import { Router } from "express";
import { loginUser } from "../controller/index.js";
export const userRouter = Router();

export const loginRouter = Router();

loginRouter.post("/", loginUser);

import { Router } from "express";
export const userRouter = Router();

export const meRouter = Router();

meRouter.get(
  "/",
  authGuard,
  roleGuard(["admin", "superadmin"]),
  (req, res) => {
    res.send("ok");
  }
);

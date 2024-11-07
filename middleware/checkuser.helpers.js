import { verifyToken } from "../helpers/jwt.js";

export function checkUser(req, res, next) {
  const token = req.headers?.authorization?.split(" ")?.[1];

  const { error, decode } = verifyToken("access", token);

  req.user = decode;

  next();
}

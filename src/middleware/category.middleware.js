import jwt from "jsonwebtoken";

export const categoryGuard = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(409).send("token not found");
    }

    const [type, token] = req.headers.authorization?.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(409).send("Not valid data");
    }

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
      if (err) {
        return res.status(403).send("Forbidden");
      }
      req.user = payload;

      next();
    });
  } catch (error) {
    next(error);
  }
};

export const categoryCheck = (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).send("name or description not found");
    }
    next();
  } catch (error) {
    next(error);
  }
};

import jwt from "jsonwebtoken";

export const artclsGuard = (req, res, next) => {
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

export const artclesCheck = (req, res, next) => {
  try {
    const { title, content, category_id } = req.body;

    if (!title || !content || !category_id) {
      return res
        .status(400)
        .send("title, category_id, content must be entered");
    }
    next();
  } catch (error) {
    next(error);
  }
};


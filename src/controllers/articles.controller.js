// import { Articles } from "../modules/index.js";
import {
  createArticles,
  ArticlesfindOne,
  Articlesfind,
  ArticlesfindOneAndUpdate,
  ArticlesdeleteOne,
} from "../service/index.js";
import {
  statusCodes,
  errorMessages,
  ApiError,
  logger,
} from "../utils/index.js";

export const addArticlesCon = async (req, res, next) => {
  try {
    const newArticles = new createArticles({
      ...req.body,
      author_id: req.user.id,
    });
    await newArticles.save();
    return res.status(statusCodes.CREATED).send("created");
  } catch (error) {
    logger.error(error);
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getAllArticlesCon = async (req, res, next) => {
  try {
    const allArticles = await Articlesfind();

    if (allArticles.length === 0) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.ARTICLE_NOT_FOUND);
    }

    res.status(statusCodes.OK).send(allArticles);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getOneArticlesCon = async (req, res, next) => {
  try {
    const allArticles = await Articlesfind({ _id: req.params.id });

    if (allArticles.length === 0) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.ARTICLE_NOT_FOUND);
    }

    res.status(statusCodes.OK).send(allArticles);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateOneArticlesCon = async (req, res, next) => {
  try {
    const allArticles = await Articlesfind({ _id: req.params.id });
    const user_id = req.user.id;
    const author_id = allArticles[0].author_id;
    if (user_id == author_id) {
      const updateArticles = await ArticlesfindOneAndUpdate(
        { _id: req.params.id },
        req.body
      );

      if (!updateArticles) {
        return res
          .status(statusCodes.NOT_FOUND)
          .send(errorMessages.ARTICLE_NOT_FOUND);
      }

      res.status(202).send(updateArticles);
    } else {
      res.status(403).send("Forbidden");
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteOneArticlesCon = async (req, res, next) => {
  try {
    const allArticles = await Articles.find({ _id: req.params.id });
    const user_id = req.user.id;
    const author_id = allArticles[0].author_id;

    if (user_id == author_id) {
      const allArticles = await ArticlesdeleteOne({ _id: req.params.id });

      if (allArticles.deletedCount === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .send(errorMessages.ARTICLE_NOT_FOUND);
      }
      res.status(statusCodes.OK).send(allArticles);
    } else {
      res.status(403).send("Forbidden");
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

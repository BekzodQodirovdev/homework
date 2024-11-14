import { Comments } from "../modules/index.js";
import { statusCodes, errorMessages, ApiError, logger } from "../utils/index.js";

export const addcommentsCon = async (req, res, next) => {
  try {
    const newcomments = new Comments(req.body);
    await newcomments.save();
    return res.status(statusCodes.CREATED).send("created");
  } catch (error) {
    logger.error(error);
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getAllcommentsCon = async (req, res, next) => {
  try {
    const allcomments = await Comments.find();

    if (allcomments.length === 0) {
      return res.status(statusCodes.NOT_FOUND).send("Course not found");
    }

    res.status(statusCodes.OK).send(allcomments);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getOnecommentsCon = async (req, res, next) => {
  try {
    const allcomments = await Comments.find({ _id: req.params.id });

    if (allcomments.length === 0) {
      return res.status(statusCodes.NOT_FOUND).send("comments not found");
    }

    res.status(statusCodes.OK).send(allcomments);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateOnecommentsCon = async (req, res, next) => {
  try {
    if (req.params.id) {
      const updatecomments = await Comments.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );

      if (!updatecomments) {
        return res.status(statusCodes.NOT_FOUND).send("comments not found");
      }

      res.status(202).send(updatecomments);
    } else {
      res.status(statusCodes.NOT_FOUND).send("id must be entered");
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteOnecommentsCon = async (req, res, next) => {
  try {
    const allcomments = await Comments.deleteOne({ _id: req.params.id });

    if (allcomments.deletedCount === 0) {
      return res.status(statusCodes.NOT_FOUND).send("Course not found");
    }

    res.status(statusCodes.OK).send(allcomments);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

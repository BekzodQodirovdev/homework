import { Category } from "../modules/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";

export const addCategoryCon = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    return res.status(statusCodes.CREATED).send("created");
  } catch (error) {
    logger.error(error);
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getAllCategoryCon = async (req, res, next) => {
  try {
    const allCategory = await Category.find();

    if (allCategory.length === 0) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.CATEGORY_NOT_FOUND);
    }

    res.status(statusCodes.OK).send(allCategory);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getOneCategoryCon = async (req, res, next) => {
  try {
    const allCategory = await Category.find({ _id: req.params.id });

    if (allCategory.length === 0) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.CATEGORY_NOT_FOUND);
    }

    res.status(statusCodes.OK).send(allCategory);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateOneCategoryCon = async (req, res, next) => {
  try {
    if (req.params.id) {
      const updateCategory = await Category.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );

      if (!updateCategory) {
        return res
          .status(statusCodes.NOT_FOUND)
          .send(errorMessages.CATEGORY_NOT_FOUND);
      }

      res.status(202).send(updateCategory);
    } else {
      res.status(statusCodes.NOT_FOUND).send("id must be entered");
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteOneCategoryCon = async (req, res, next) => {
  try {
    const allCategory = await Category.deleteOne({ _id: req.params.id });

    if (allCategory.deletedCount === 0) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.CATEGORY_NOT_FOUND);
    }

    res.status(statusCodes.OK).send(allCategory);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

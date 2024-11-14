import { Courses } from "../modules/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";

export const addcoursesCon = async (req, res, next) => {
  try {
    const newcourses = new Courses(req.body);
    await newcourses.save();
    return res.status(statusCodes.CREATED).send("created");
  } catch (error) {
    logger.error(error);
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getAllcoursesCon = async (req, res, next) => {
  try {
    const allcourses = await Courses.find();

    if (allcourses.length === 0) {
      return res.status(statusCodes.NOT_FOUND).send("Course not found");
    }

    res.status(statusCodes.OK).send(allcourses);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getOnecoursesCon = async (req, res, next) => {
  try {
    const allcourses = await Courses.find({ _id: req.params.id });

    if (allcourses.length === 0) {
      return res.status(statusCodes.NOT_FOUND).send("Courses not found");
    }

    res.status(statusCodes.OK).send(allcourses);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateOnecoursesCon = async (req, res, next) => {
  try {
    if (req.params.id) {
      const updatecourses = await Courses.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );

      if (!updatecourses) {
        return res.status(statusCodes.NOT_FOUND).send("Courses not found");
      }

      res.status(202).send(updatecourses);
    } else {
      res.status(statusCodes.NOT_FOUND).send("id must be entered");
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteOnecoursesCon = async (req, res, next) => {
  try {
    const allcourses = await Courses.deleteOne({ _id: req.params.id });

    if (allcourses.deletedCount === 0) {
      return res.status(statusCodes.NOT_FOUND).send("Course not found");
    }

    res.status(statusCodes.OK).send(allcourses);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

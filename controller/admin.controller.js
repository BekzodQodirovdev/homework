import { Admin } from "../models/index.js";
import adminChek from "../schema/admin.schema.js";

export const createAdimCon = async (req, res, next) => {
  try {
    const { error, value } = adminChek(req.body);
    if (error) {
      return res.status(400).send("fiellds must be filled");
    }
    const autherCret = await Admin({
      ...req.body,
    });
    await autherCret.save();

    res.status(201).send({
      status: "Creted",
      user: autherCret._id,
    });
  } catch (err) {
    next(err);
  }
};

export const updateAdimCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error, value } = adminChek(req.body);
    if (error || !id) {
      return res.status(400).send("fiellds must be filled");
    }
    const updatedAuthor = await Admin.findByIdAndUpdate(id, req.body);

    res.status(201).send({
      status: "Updated",
    });
  } catch (err) {
    next(err);
  }
};

export const getAdimCon = async (req, res, next) => {
  try {
    const autherget = await Admin.find();
    res.status(201).send({
      status: "Get",
      auther: autherget,
    });
  } catch (err) {
    next(err);
  }
};

export const getByIdAdimCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).send("fiellds must be filled");
    }
    const byId = await Admin.find({ _id: id });
    res.status(201).send({
      status: "get",
      data: byId,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAdimCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).send("fiellds must be filled");
    }
    const deleteCategory = await Admin.deleteOne({ _id: id });

    if (deleteCategory.deletedCount) {
      return res.status(201).send({
        status: "deleted",
      });
    }
    return res.status(404).send({
      status: "Not found",
    });
  } catch (err) {
    next(err);
  }
};

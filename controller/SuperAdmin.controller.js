import { Super } from "../models/index.js";
import  superAdminChek  from "../schema/superAdmin.schema.js";

export const createSuperAdimCon = async (req, res, next) => {
  try {
    const { error, value } = superAdminChek(req.body);
    if (error) {
      return res.status(400).send("fiellds must be filled");
    }
    const autherCret = await Super({
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

export const updateSuperAdimCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error, value } = superAdminChek(req.body);
    if (error || !id) {
      return res.status(400).send("fiellds must be filled");
    }

    const updatedAuthor = await Super.findByIdAndUpdate(id, req.body);
    res.status(201).send({
      status: "Updated",
    });
  } catch (err) {
    next(err);
  }
};

export const getSuperAdimCon = async (req, res, next) => {
  try {
    const autherget = await Auther.find();
    res.status(201).send({
      status: "Get",
      auther: autherget,
    });
  } catch (err) {
    next(err);
  }
};

export const getByIdSuperAdimCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).send("fiellds must be filled");
    }
    const byId = await Super.find({ _id: id });
    res.status(201).send({
      status: "get",
      data: byId,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteSuperAdimCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).send("fiellds must be filled");
    }
    const deleteCategory = await Super.deleteOne({ _id: id });

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

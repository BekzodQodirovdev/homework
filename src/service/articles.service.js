import { Articles } from "../modules/index.js";

export const createArticles = async (data) => {
  const newArticles = await new Articles(data);
  await newArticles.save();
  return newArticles;
};

export const ArticlesfindOne = async (data) => {
  const updataData = data || {};
  const Articlesdata = await Articles.findOne(updataData);

  return Articlesdata;
};

export const Articlesfind = async (data) => {
  const updataData = data || {};
  const Articlesdata = await Articles.find(updataData);

  return Articlesdata;
};

export const ArticlesfindOneAndUpdate = async (id, data) => {
  const updataData = data || {};
  const Articlesdata = await Articles.findByIdAndUpdate(id, updataData);

  return Articlesdata;
};

export const ArticlesdeleteOne = async (data) => {
  const Articlesdata = await Articles.deleteOne(data);

  return Articlesdata;
};

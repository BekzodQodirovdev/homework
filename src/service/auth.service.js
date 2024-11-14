import { User } from "../modules/index.js";

export const createUser = async (data) => {
  const newUser = await new User(data);
  await newUser.save();
  return newUser;
};

export const userfindOne = async (data) => {
  const userdata = await User.findOne(data);

  return userdata;
};

import { User } from "../modules/index.js";

export const userfindOne = async (data) => {
  const userdata = await User.findOne(data);

  return userdata;
};

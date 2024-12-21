import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const compairePassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  const res = await bcrypt.compare(password, hashPassword);
  return res;
};

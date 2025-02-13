import bcrypt from "bcrypt";

export const encryptPassword = (password: string) => {
  return bcrypt.hashSync(password, 7);
};

export const checkPassword = (input: string, password: string) => {
  return bcrypt.compareSync(input, password);
};

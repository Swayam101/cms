import { IUser } from "../interfaces/user.interface";
import UserModels from "../models/user.models";

const createUser = (
  username: IUser["username"],
  password: IUser["password"]
) => {
  return UserModels.User.create({ username, password });
};

const getUserById = (id: string) => {
  return UserModels.User.findById(id);
};

const updatePassword = (id: string, password: IUser["password"]) => {
  return UserModels.User.findByIdAndUpdate(id, { $set: { password } });
};

const updateUserStatus = (id: string, status: boolean) => {
  return UserModels.User.findByIdAndUpdate(id, { $set: { status } });
};

const getAllUsers = () => {
  return UserModels.User.find();
};

export default {
  createUser,
  getUserById,
  updatePassword,
  updateUserStatus,
  getAllUsers,
};

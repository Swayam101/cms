import { FilterQuery } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import UserModels from "../models/user.models";
import { IPaging } from "../../../interface/paging.interface";
import paginate from "../../../utils/paginateQuery.utils";

const createUser = (
  username: IUser["username"],
  password: IUser["password"]
) => {
  return UserModels.User.create({ username, password });
};

const getUserById = (id: string) => {
  return UserModels.User.findById(id);
};

const getUserForLogin = (data: Pick<IUser, "username" | "password">) => {
  return UserModels.User.findOne(data);
};

const updatePassword = (id: string, password: IUser["password"]) => {
  return UserModels.User.findByIdAndUpdate(id, { $set: { password } });
};

const updateUserStatus = (id: string, status: boolean) => {
  return UserModels.User.findByIdAndUpdate(id, { $set: { status } });
};

const getAllUsers = (filter: FilterQuery<IUser>, { limit, page }: IPaging) => {
  return paginate(
    UserModels.User as any,
    filter,
    page,
    limit,
    {
      updatedAt: -1,
    },
    []
  );
};

const editUser = (user: IUser) => {
  const { _id, ...rest } = user;
  return UserModels.User.findByIdAndUpdate(_id, rest);
};

export default {
  getUserForLogin,
  createUser,
  getUserById,
  updatePassword,
  updateUserStatus,
  getAllUsers,
  editUser,
};

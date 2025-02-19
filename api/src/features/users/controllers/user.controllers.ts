import { asyncWrapper } from "../../../utils/asyncWrapper";
import createUserController from "./createUser.controller";
import editUserController from "./editUser.controller";
import getAllUsersController from "./getAllUsers.controller";
import getUserCustomers from "./getUserCustomers.controller";
import getUserByIdController from "./getUserById.controller";
import updateUserPasswordController from "./updateUserPassword.controller";
import updateUserStatusController from "./updateUserStatus.controller";

export default {
  createUser: asyncWrapper(createUserController),
  editUser: asyncWrapper(editUserController),
  updateUserPassword: asyncWrapper(updateUserPasswordController),
  updateUserStatus: asyncWrapper(updateUserStatusController),
  getAllUsers: asyncWrapper(getAllUsersController),
  getUserById: asyncWrapper(getUserByIdController),
  getUserCustomers: asyncWrapper(getUserCustomers),
};

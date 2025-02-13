import { asyncWrapper } from "../../../utils/asyncWrapper";
import createUserController from "./createUser.controller";
import getAllUsersController from "./getAllUsers.controller";
import updateUserPasswordController from "./updateUserPassword.controller";
import updateUserStatusController from "./updateUserStatus.controller";

export default {
  createUser: asyncWrapper(createUserController),
  updateUserPassword: asyncWrapper(updateUserPasswordController),
  updateUserStatus: asyncWrapper(updateUserStatusController),
  getAllUsers: asyncWrapper(getAllUsersController),
};

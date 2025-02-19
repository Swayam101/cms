import { asyncWrapper } from "../../../utils/asyncWrapper";
import adminLoginController from "./adminLogin.controller";
import createAdminController from "./createAdmin.controller";
import getAdminProfileController from "./getAdminProfile.controller";
import getUserProfileController from "./getUserProfile.controller";
import userLoginController from "./userLogin.controller";

export default {
  adminLogin: asyncWrapper(adminLoginController),
  userLogin: asyncWrapper(userLoginController),
  createAdmin: asyncWrapper(createAdminController),
  getAdminProfile: asyncWrapper(getAdminProfileController),
  getUserProfile: asyncWrapper(getUserProfileController),
};

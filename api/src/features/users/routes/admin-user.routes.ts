import { Router } from "express";
import userControllers from "../controllers/user.controllers";
import userValidators from "../validators/user.validators";

const adminUserRouter = Router();

adminUserRouter.post(
  "/",
  userValidators.createUserValidation,
  userControllers.createUser
);

adminUserRouter.post(
  "/password",
  userValidators.updatePassword,
  userControllers.updateUserPassword
);

adminUserRouter.post(
  "/status",
  userValidators.updateStatus,
  userControllers.updateUserStatus
);

adminUserRouter.get("/all", userControllers.getAllUsers);

export default adminUserRouter;

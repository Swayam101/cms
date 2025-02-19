import { Router } from "express";
import userControllers from "../controllers/user.controllers";
import userValidators from "../validators/user.validators";
import middlewares from "../../../middlewares";

const adminUserRouter = Router();

// adminUserRouter.use(middlewares.checkAdminAccess);

adminUserRouter.post(
  "/",
  userValidators.createUserValidation,
  middlewares.checkAdminAccess,
  userControllers.createUser
);

adminUserRouter.get("/", userControllers.getUserById);

adminUserRouter.post(
  "/edit",
  middlewares.checkAdminAccess,
  userControllers.editUser
);

adminUserRouter.get(
  "/customers/user",
  middlewares.checkAdminAccess,
  userControllers.getUserCustomers
);

adminUserRouter.post(
  "/password",
  middlewares.checkAdminAccess,
  userValidators.updatePassword,
  userControllers.updateUserPassword
);

adminUserRouter.post(
  "/status",
  middlewares.checkAdminAccess,
  userValidators.updateStatus,
  userControllers.updateUserStatus
);

adminUserRouter.get(
  "/all",
  middlewares.checkAdminAccess,
  userControllers.getAllUsers
);

export default adminUserRouter;

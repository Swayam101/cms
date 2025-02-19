import { Router } from "express";
import authController from "../controllers/auth.controller";
import middlewares from "../../../middlewares";

const userAuthRoutes = Router();

userAuthRoutes.post("/user/login", authController.userLogin);
userAuthRoutes.get(
  "/user/profile",
  middlewares.checkUserAccess,
  authController.getUserProfile
);

export default userAuthRoutes;

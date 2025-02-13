import { Router } from "express";
import authControllers from "../controllers/auth.controller";
import authValidators from "../validators/auth.validators";
import middlewares from "../../../middlewares";

const adminAuthRoutes = Router();

adminAuthRoutes.post(
  "/admin/login",
  authValidators.loginAdmin,
  authControllers.adminLogin
);

adminAuthRoutes.get(
  "/admin/profile",
  middlewares.checkAdminAccess,
  authControllers.getAdminProfile
);

adminAuthRoutes.post("/admin/create", authControllers.createAdmin);

export default adminAuthRoutes;

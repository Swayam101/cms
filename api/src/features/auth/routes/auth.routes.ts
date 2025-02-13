import { Router } from "express";
import adminAuthRoutes from "./admin.auth.routes";
import userAuthRoutes from "./user.auth.routes";

export default {
  adminAuthRoutes,
  userAuthRoutes,
} as { [key: string]: Router };

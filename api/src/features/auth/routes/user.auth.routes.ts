import { Router } from "express";

const userAuthRoutes = Router();

userAuthRoutes.post("/user/login");

export default userAuthRoutes;

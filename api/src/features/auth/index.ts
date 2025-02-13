import authController from "./controllers/auth.controller";
import authModels from "./models/auth.models";
import authRoutes from "./routes/auth.routes";

export default {
  controller: authController,
  routers: authRoutes,
  models: authModels,
};

import { Router } from "express";
import customerControllers from "../controllers/customer.controllers";
import customerValidators from "../validators/customer.validators";
import middlewares from "../../../middlewares";
import validateRequest from "../../../utils/validateRequest";
import multerLib from "../lib/multer.lib";

const customerRoute = Router();

customerRoute.post(
  "/upload",
  middlewares.checkAdminAccess,
  multerLib,
  customerControllers.uploadCustomerData
);

customerRoute.post(
  "/verify",
  middlewares.checkAdminAccess,
  multerLib,

  customerControllers.validateCustomerData
);

customerRoute.post(
  "/",
  middlewares.checkAdminAccess,
  validateRequest(customerValidators.addCustomer),
  customerControllers.addCustomer
);

customerRoute.post("/status");

export default customerRoute;

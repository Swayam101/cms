import { Router } from "express";
import customerControllers from "../controllers/customer.controllers";
import customerValidators from "../validators/customer.validators";
import middlewares from "../../../middlewares";
import validateRequest from "../../../utils/validateRequest";
import multerLib from "../lib/multer.lib";

const customerRoute = Router();

customerRoute.get(
  "/",
  middlewares.checkAdminAccess,
  customerControllers.getAllCustomers
);

customerRoute.post(
  "/assign",
  middlewares.checkAdminAccess,
  customerControllers.assignCustomers
);

customerRoute.get(
  "/one",
  middlewares.checkAdminAccess,
  customerControllers.getCustomerById
);

customerRoute.get(
  "/logs",
  middlewares.checkAdminAccess,
  customerControllers.getUploadLogs
);

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

customerRoute.post(
  "/edit",
  middlewares.checkAdminAccess,
  customerControllers.editCustomerDetails
);

customerRoute.post(
  "/status",
  middlewares.checkAdminAccess,
  customerControllers.changeCustomerStatus
);

export default customerRoute;

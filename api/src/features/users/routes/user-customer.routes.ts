import { Router } from "express";
import userControllers from "../controllers/user.controllers";
import middlewares from "../../../middlewares";
import customerControllers from "../../customer/controllers/customer.controllers";

const userCustomerRouter = Router();

userCustomerRouter.use(middlewares.checkUserAccess);

userCustomerRouter.get("/my/customers", userControllers.getUserCustomers);

userCustomerRouter.post(
  "/my/customer/status",

  customerControllers.changeCustomerStatus
);

export default userCustomerRouter;

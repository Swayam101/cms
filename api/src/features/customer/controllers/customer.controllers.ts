import { asyncWrapper } from "../../../utils/asyncWrapper";
import addCustomerController from "./addCustomer.controller";
import changeCustomerStatusController from "./changeCustomerStatus.controller";
import uploadCustomerDataController from "./uploadCustomerData.controller";
import validateCustomerDataController from "./validateCustomerData.controller";

export default {
  uploadCustomerData: asyncWrapper(uploadCustomerDataController),
  addCustomer: asyncWrapper(addCustomerController),
  changeCustomerStatus: asyncWrapper(changeCustomerStatusController),
  validateCustomerData: asyncWrapper(validateCustomerDataController),
};

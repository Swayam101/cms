import { asyncWrapper } from "../../../utils/asyncWrapper";
import addCustomerController from "./addCustomer.controller";
import assignCustomersController from "./assignCustomers.controller";
import changeCustomerStatusController from "./changeCustomerStatus.controller";
import editCustomerDetailsController from "./editCustomerDetails.controller";
import getAllCustomersController from "./getAllCustomers.controller";
import getCustomerByIdController from "./getCustomerById.controller";
import getUploadLogsController from "./getUploadLogs.controller";
import uploadCustomerDataController from "./uploadCustomerData.controller";
import validateCustomerDataController from "./validateCustomerData.controller";

export default {
  uploadCustomerData: asyncWrapper(uploadCustomerDataController),
  addCustomer: asyncWrapper(addCustomerController),
  changeCustomerStatus: asyncWrapper(changeCustomerStatusController),
  validateCustomerData: asyncWrapper(validateCustomerDataController),
  getAllCustomers: asyncWrapper(getAllCustomersController),
  getUploadLogs: asyncWrapper(getUploadLogsController),
  getCustomerById: asyncWrapper(getCustomerByIdController),
  assignCustomers: asyncWrapper(assignCustomersController),
  editCustomerDetails: asyncWrapper(editCustomerDetailsController),
};

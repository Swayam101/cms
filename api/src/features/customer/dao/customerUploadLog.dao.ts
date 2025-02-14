import { ICustomerUploadLog } from "../interfaces/customerUploadLog.interface";
import customerModels from "../models/customer.models";

const createLog = (log: ICustomerUploadLog) => {
  return customerModels.CustomerUploadLogs.create(log);
};

const getAllLogs = () => {
  return customerModels.CustomerUploadLogs.find({});
};

export default {
  createLog,
  getAllLogs,
};

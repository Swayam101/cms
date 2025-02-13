import { ICustomer } from "../interfaces/customer.interface";
import customerModels from "../models/customer.models";

const addCustomer = (customer: ICustomer) => {
  return customerModels.Customer.create(customer);
};

const changeCustomerStatus = (id: string, status: ICustomer["status"]) => {
  return customerModels.Customer.findByIdAndUpdate(id, { status });
};

export default {
  addCustomer,
  changeCustomerStatus,
};

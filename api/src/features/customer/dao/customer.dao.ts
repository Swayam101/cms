import { FilterQuery } from "mongoose";
import { ICustomer } from "../interfaces/customer.interface";
import customerModels from "../models/customer.models";
import paginate from "../../../utils/paginateQuery.utils";
import { IPaging } from "../../../interface/paging.interface";

const addCustomer = (customer: ICustomer) => {
  return customerModels.Customer.create(customer);
};

const changeCustomerStatus = (id: string, status: ICustomer["status"]) => {
  return customerModels.Customer.findByIdAndUpdate(id, { status });
};

const getAllCustomers = (
  filter: FilterQuery<ICustomer>,
  { limit, page }: IPaging
) => {
  return paginate(customerModels.Customer as any, filter, page, limit, {
    updatedAt: -1,
  });
};

const getCustomerById = (id: string) => {
  return customerModels.Customer.findById(id);
};

export default {
  addCustomer,
  changeCustomerStatus,
  getAllCustomers,
  getCustomerById,
};

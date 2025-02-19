import { FilterQuery } from "mongoose";
import { ICustomer } from "../interfaces/customer.interface";
import customerModels from "../models/customer.models";
import paginate from "../../../utils/paginateQuery.utils";
import { IPaging } from "../../../interface/paging.interface";
import { IActionHistory } from "../interfaces/actionHistory.interface";

const addCustomer = (customer: ICustomer) => {
  return customerModels.Customer.create(customer);
};

const changeCustomerStatus = (
  id: string,
  status: ICustomer["status"],
  action: IActionHistory
) => {
  return customerModels.Customer.findByIdAndUpdate(
    id,
    {
      $set: { status },
      $push: { statusHistory: action },
    },
    { new: true }
  );
};

const getAllCustomers = (
  filter: FilterQuery<ICustomer>,
  { limit, page }: IPaging
) => {
  return paginate(
    customerModels.Customer as any,
    filter,
    page,
    limit,
    {
      updatedAt: -1,
    },
    ["assignedTo"]
  );
};

const getCustomerById = (id: string) => {
  return customerModels.Customer.findById(id).populate("assignedTo");
};

export default {
  addCustomer,
  changeCustomerStatus,
  getAllCustomers,
  getCustomerById,
};

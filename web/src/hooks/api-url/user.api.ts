const prefix = "/user";
export const usersApis = {
  getAllUser: "/user" + "/all",
  changeStatus: prefix + "/status",
  createUser: prefix,
  assignUserCustomers: "/customer" + "/assign",
  getUserCustomers: prefix + "/customers/user",
  getMyCustomers: prefix + "/my/customers",
  updateCustomerStatus: "/user" + "/my/customer/status",
};

const prefix = "/admin";
export const adminApis = {
  GET_ALL_LOGS: "/customer" + "/logs",
  VERIFY_CUSTOMER: "/customer" + "/verify",
  UPLOAD_CUSTOMER: "/customer" + "/upload",
  getAdminById: (id: string) => prefix + `/admin/getById?id=${id}`,
};

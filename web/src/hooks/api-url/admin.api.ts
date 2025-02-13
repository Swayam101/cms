const prefix = "/admin";
export const adminApis = {
  getAllAdmin: prefix + "/admin/all",
  changeStatus: prefix + "/admin/status",
  deleteAdmin: prefix + "/admin/delete",
  createOrUpdate: prefix + "/admin",
  getAdminById: (id: string) => prefix + `/admin/getById?id=${id}`,
};

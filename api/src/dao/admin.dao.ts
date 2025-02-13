import { IAdmin } from "../interface/admin.interface";
import models from "../models";

const getAdminForLogin = (
  username: IAdmin["username"],
  password: IAdmin["password"]
) => {
  return models.Admin.findOne({ username, password });
};

const createAdmin = (
  username: IAdmin["username"],
  password: IAdmin["password"]
) => {
  return models.Admin.create({ username, password });
};

const getAdminById = (id: string) => {
  return models.Admin.findById(id);
};

export default {
  getAdminForLogin,
  createAdmin,
  getAdminById,
};

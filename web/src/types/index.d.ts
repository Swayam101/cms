import { IActionHistory } from "../interfaces/actionHistory.interface";

export interface IUploadErrorsTableData {
  row: number;
  errors: string;
  mobile: string;
}

export interface ICustomerData {
  _id: string;
  name: string;
  phone: string;
  status: string;
  createdAt: string;
  assignedTo?: string | { username: string; email: string; status: boolean };
  checked: boolean;
  statusHistory: IActionHistory[];
  freeTrial?: Date;
}
export interface UploadLogTableData {
  totalUploads: number;
  createdAt: string;
}
export interface UserTableData {
  status: boolean;
  _id: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminData {
  _id?: string;

  username?: string;
}

export interface IAdminForm {
  file: undefined | File;
}

export interface IUserForm {
  username: string;
  password: string;
  status: boolean;
}

export interface ICustomerForm {
  name: string;
}

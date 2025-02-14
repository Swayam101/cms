import { IUploadErrorsTableData } from "../types";

export const UploadErrorsTable: TTableColumns<IUploadErrorsTableData>[] = [
  {
    key: "role",
    label: "Row Number",
    minWidth: "10%",
    renderCell: (value) => value.row,
  },
  {
    key: "role",
    label: "Phone",
    minWidth: "10%",
    renderCell: (value) => value.mobile,
  },
  {
    key: "role",
    label: "Error Message",
    minWidth: "10%",
    renderCell: (value) => value.errors,
  },
];

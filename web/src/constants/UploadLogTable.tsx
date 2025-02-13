import moment from "moment";
import { AdminTableData } from "../types";

export const UploadLogTable: TTableColumns<AdminTableData>[] = [
  {
    key: "role",
    label: "Total Uploads",
    minWidth: "10%",
    renderCell: (value) => value.totalUploads,
  },
  {
    key: "role",
    label: "Upload Date",
    minWidth: "10%",
    renderCell: (value) =>
      moment(new Date(value.totalUploads)).format("dd-mm-yy"),
  },
];

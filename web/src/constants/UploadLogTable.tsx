import moment from "moment";
import { UploadLogTableData } from "../types";

export const UploadLogTable: TTableColumns<UploadLogTableData>[] = [
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
      moment(new Date(value.createdAt)).format("DD-MM-YYYY"),
  },
];

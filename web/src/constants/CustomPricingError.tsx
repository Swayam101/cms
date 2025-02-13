import moment from "moment";
import { ICustomPricingTable } from "../types";

export const customPricingErrorTable: TTableColumns<ICustomPricingTable>[] = [
  {
    key: "startDate",
    label: "Start Date",
    minWidth: "100px",
    renderCell: (value) =>
      moment(new Date(value.startDate)).format("DD/MM/YYYY"),
  },
  {
    key: "endDate",
    label: "End Date",
    minWidth: "100px",
    renderCell: (value) => moment(new Date(value.endDate)).format("DD/MM/YYYY"),
  },
  {
    key: "Court Price",
    label: "Court Price",
    minWidth: "100px",
    renderCell: (value) => value.price.court,
  },
  {
    key: "Slot Price",
    label: "Slot Price",
    minWidth: "100px",
    renderCell: (value) => value.price.slot,
  },
];

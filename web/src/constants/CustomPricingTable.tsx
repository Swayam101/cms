import moment from "moment";
import { ICustomPricingTable } from "../types";
import CustomPricingActionBar from "../components/ActionBar/CustomPricingActionBar";

export const customPricingTable: TTableColumns<ICustomPricingTable>[] = [
  {
    key: "startDate",
    label: "Start Date",
    minWidth: "180px",
    renderCell: (value) =>
      moment(new Date(value.startDate)).format("DD/MM/YYYY"),
  },
  {
    key: "endDate",
    label: "End Date",
    minWidth: "180px",
    renderCell: (value) => moment(new Date(value.endDate)).format("DD/MM/YYYY"),
  },
  {
    key: "Court Price",
    label: "Court Price",
    minWidth: "180px",
    renderCell: (value) => value.price.court,
  },
  {
    key: "Slot Price",
    label: "Slot Price",
    minWidth: "180px",
    renderCell: (value) => value.price.slot,
  },
  {
    key: "Actions",
    label: "Actions",
    minWidth: "180px",
    renderCell: (value) => (
      <CustomPricingActionBar center={value.center} id={value.id} />
    ),
  },
];

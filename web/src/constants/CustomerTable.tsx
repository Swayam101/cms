import moment from "moment";
import CourtActionBar from "../components/CustomerActionBar/CustomerActionBar";
import { ICustomerData } from "../types";
import { Chip } from "@mantine/core";

export const courtTable: TTableColumns<ICustomerData>[] = [
  {
    key: "courtName",
    label: "Name",
    minWidth: "5%",
    renderCell: (value) => value.name,
  },
  {
    key: "phone",
    label: "Phone",
    minWidth: "20%",
    renderCell: (value) => value.phone,
  },
  {
    key: "openingTime",
    label: "STATUS",
    minWidth: "10%",
    renderCell: (value) => (
      <Chip variant="filled" color="blue" checked={true}>
        {value.status}
      </Chip>
    ),
  },
  {
    key: "closingTime",
    label: "Added Date",
    minWidth: "10%",
    renderCell: (value) =>
      moment(new Date(value.createdAt)).format("DD-MM-YYYY hh:mm A"),
  },
  {
    key: "assigned",
    label: "Assigned To",
    minWidth: "20%",
    renderCell: (value) => value.assignedTo ?? "-",
  },
  {
    key: "action",
    label: "Action",
    minWidth: "20%",
    renderCell: (value) => <CourtActionBar id={value._id} status />,
  },
];

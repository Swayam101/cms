import { IActionHistory } from "../interfaces/actionHistory.interface";
import moment from "moment";
import { Chip } from "@mantine/core";
import { capitalizeWords } from "../utils/capitalize";

const CustomerStatusTable: TTableColumns<IActionHistory>[] = [
  {
    key: "date",
    label: "Date of Action",
    renderCell: (value) =>
      moment(new Date(value.date)).format("DD-MM-YYYY hh:mm A"),
  },
  {
    key: "acby",
    label: "Action By",
    renderCell: (value) => (
      <Chip
        defaultChecked
        checked={true}
        color={value.actionBy === "user" ? "cyan" : "teal"}
        fz={"24px"}
        fw={"700"}
      >
        {capitalizeWords(value.actionBy)}
      </Chip>
    ),
  },
  {
    key: "randki",
    label: "Note",
    renderCell: (value) => value.note ?? "N/A",
  },
  {
    key: "acfo",
    label: "Action For",
    renderCell: (value) => value.actionFor,
  },
  {
    key: "ac",
    label: "Action",
    renderCell: (value) => value.action,
  },
];

export default CustomerStatusTable;

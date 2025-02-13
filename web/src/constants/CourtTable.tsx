import CourtActionBar from "../components/CourtActionBar/CourtActionBar";
import { CourtTableData } from "../types";
import { convertTo12HourFormat } from "../utils/timeUtils";

export const courtTable: TTableColumns<CourtTableData>[] = [
  {
    key: "courtName",
    label: "Court Name",
    minWidth: "5%",
    renderCell: (value) => value.name,
  },
  {
    key: "address",
    label: "Address",
    minWidth: "20%",
    renderCell: (value) => value.address,
  },
  {
    key: "openingTime",
    label: "Opening Time",
    minWidth: "10%",
    renderCell: (value) => convertTo12HourFormat(value.openTime),
  },
  {
    key: "closingTime",
    label: "Closing Time",
    minWidth: "10%",
    renderCell: (value) => convertTo12HourFormat(value.closeTime),
  },
  {
    key: "action",
    label: "Action",
    minWidth: "20%",
    renderCell: (value) => (
      <CourtActionBar
        courtId={value._id ?? ""}
        status={value.active}
        centreId={value.centre}
      />
    ),
  },
];

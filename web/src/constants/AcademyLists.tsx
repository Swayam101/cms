import { Text } from "@mantine/core";
import ActionBar from "../components/ActionBar/ActionBar";
import { AcademyListsTableData } from "../types";
import { capitalizeWords } from "../utils/capitalize";
import { convertTo12HourFormat } from "../utils/timeUtils";

export const AcademyListsTable: TTableColumns<AcademyListsTableData>[] = [
  {
    key: "name",
    label: "Name",
    minWidth: "220px",
    renderCell: (value) => capitalizeWords(value.name),
  },
  {
    key: "description",
    label: "Description",
    minWidth: "220px",
    renderCell: (value) => (
      <Text
        lineClamp={2}
        styles={{
          root: {
            textAlign: "left",
            fontFamily: "'Nunito',sans-serif",
            fontWeight: "400",
            fontSize: "14px",
            color: "#202224e6",
          },
        }}
      >
        {value.description}
      </Text>
    ),
  },
  {
    key: "location",
    label: "Location",
    minWidth: "180px",
    renderCell: (value) => value.address,
  },
  {
    key: "openingTime",
    label: "Opening Time",
    minWidth: "180px",
    renderCell: (value) => convertTo12HourFormat(value.openTime),
  },
  {
    key: "closingTime",
    label: "Closing Time",
    minWidth: "180px",
    renderCell: (value) => convertTo12HourFormat(value.closeTime),
  },

  {
    key: "active",
    label: "Action",
    minWidth: "220px",
    renderCell: (value) => (
      <div>
        <ActionBar
          entity="academyList"
          id={value._id}
          status={value.active}
          noDelete
        />
      </div>
    ),
  },
];

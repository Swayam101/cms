import { Text } from "@mantine/core";
import ActionBar from "../components/ActionBar/ActionBar";
import { CenterTableData } from "../types";
import { capitalizeWords } from "../utils/capitalize";
import { convertTo12HourFormat } from "../utils/timeUtils";
import CentreTablePricing from "../components/center/CentreTablePricing";

export const centerTable: TTableColumns<CenterTableData>[] = [
  {
    key: "images",
    label: "Image",
    minWidth: "180px",
    renderCell: (value: any) => (
      <img
        src={value.images[0]}
        alt="Card"
        style={{ maxWidth: 100, borderRadius: "4px" }}
      />
    ),
  },
  {
    key: "name",
    label: "Center Name",
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
    key: "priceSlot",
    label: "Weekend Price",
    minWidth: "140px",
    renderCell: (value) => <CentreTablePricing value={value} type="Weekend" />,
  },
  {
    key: "priceCourt",
    label: "Regular Price",
    minWidth: "180px",
    renderCell: (value) => <CentreTablePricing value={value} type="Regular" />,
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
    key: "amenities",
    label: "Amenities",
    minWidth: "180px",
    renderCell: (value) => capitalizeWords(value.amenities.join(", ")),
  },
  {
    key: "active",
    label: "Action",
    minWidth: "220px",
    renderCell: (value) => (
      <ActionBar
        entity="centre"
        id={value._id}
        status={value.active}
        noDelete
        pricing
      />
    ),
  },
];

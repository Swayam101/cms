import { Chip, ChipGroup } from "@mantine/core";
import OnlyDeleteActionBar from "../components/ActionBar/OnlyDeleteActionBar";
import { IEditBlockedSlots } from "../types";
import FTypography from "../ui/typography/FTypography";

export const editBlockSlotsTable: TTableColumns<IEditBlockedSlots>[] = [
  {
    key: "note",
    label: "Note",
    minWidth: "180px",
    renderCell: (value) => value.note,
  },
  {
    key: "Time",
    label: "Slot",
    minWidth: "180px",
    renderCell: (value) => (
      <ChipGroup>
        {value.slots.map((item) => (
          <Chip key={item}>{getFormateTime(item)}</Chip>
        ))}
      </ChipGroup>
    ),
  },
  //   {
  //     key: "endTime",
  //     label: "End Time",
  //     minWidth: "180px",
  //     renderCell: (value) =>
  //       getStartAndEndTime(
  //         value.slots.map((value) => ({ id: value, time: "1h", isBooked: true }))
  //       ).endTime,
  //   },
  {
    key: "courts",
    label: "Courts",
    minWidth: "180px",
    renderCell: (value) => (
      <div>
        {value.courts.map((value, index) => {
          return (
            <FTypography
              text={value.name}
              fontSize={14}
              variant="oswald500"
              key={"blocked-court" + index}
            />
          );
        })}
      </div>
    ),
  },
  {
    key: "Actions",
    label: "Actions",
    minWidth: "180px",
    renderCell: (value) => <OnlyDeleteActionBar id={value._id} />,
  },
];

const getFormateTime = (time: string) =>
  `${time.split("_")[1]}:00 ${time.split("_")[2]}`;

import { Text } from "@mantine/core";
import ActionBar from "../components/ActionBar/ActionBar";
import { AcademyPlanTableData } from "../types";
import { capitalizeWords } from "../utils/capitalize";
import { convertTo12HourFormat } from "../utils/timeUtils";
import moment from "moment";

export const AcademyPlanTable: TTableColumns<AcademyPlanTableData>[] = [
  {
    key: "image",
    label: "Image",
    minWidth: "140px",
    renderCell: (value) => (
      <img
        src={value.image}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "/error.png";
        }}
        alt="Card"
        style={{ maxWidth: 100, borderRadius: "4px" }}
      />
    ),
  },
  {
    key: "name",
    label: "Name",
    minWidth: "200px",
    renderCell: (value: AcademyPlanTableData) => capitalizeWords(value.name),
  },
  {
    key: "batchType",
    label: "Batch Type",
    minWidth: "200px",
    renderCell: (value: AcademyPlanTableData) =>
      capitalizeWords(value.batchType),
  },
  {
    key: "price",
    label: "Price",
    minWidth: "120px",
    renderCell: (value: AcademyPlanTableData) => value.price,
  },
  {
    key: "gst",
    label: "GST %",
    minWidth: "120px",
    renderCell: (value: AcademyPlanTableData) => value.gst,
  },
  {
    key: "day",
    label: "Days",
    minWidth: "180px",
    renderCell: (value: AcademyPlanTableData) => (
      <div>
        {value.day.map((item, index) => (
          <div key={"i" + index}>{capitalizeWords(item)}</div>
        ))}
      </div>
    ),
  },
  {
    key: "batchStartDate",
    label: "Batch Start Date",
    minWidth: "180px",
    renderCell: (value: AcademyPlanTableData) =>
      moment(value.batchStartDate).format("DD-MM-YYYY"),
  },
  {
    key: "duration",
    label: "Duration",
    minWidth: "180px",
    renderCell: (value: AcademyPlanTableData) => (
      <div>
        <Text>Months :- {value.duration.months}</Text>
        <Text>Session:- {value.duration.session}</Text>
      </div>
    ),
  },
  {
    key: "maximumIntake",
    label: "Maximum Intake",
    minWidth: "180px",
    renderCell: (value: AcademyPlanTableData) => value.maximumIntake,
  },
  {
    key: "batchStartTime",
    label: "Batch Start Time",
    minWidth: "240px",
    renderCell: (value: AcademyPlanTableData) =>
      value.batchTiming?.length > 0 ? (
        <div>
          {value.batchTiming.map((batchItem, index) => (
            <div key={batchItem._id}>
              Batch {index + 1}: {convertTo12HourFormat(batchItem.startTime)} to{" "}
              {convertTo12HourFormat(batchItem.closeTime)}
            </div>
          ))}
        </div>
      ) : (
        <Text>No batches available</Text>
      ),
  },

  {
    key: "active",
    label: "Action",
    minWidth: "220px",
    renderCell: (value: AcademyPlanTableData) => (
      <ActionBar
        entity="academyPlan"
        id={value._id}
        status={value.active}
        noDelete
      />
    ),
  },
];

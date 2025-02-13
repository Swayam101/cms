import { Chip, Text } from "@mantine/core";
import ActionBar from "../components/ActionBar/ActionBar";
import { AcademyRegistrationTableData } from "../types";
import { capitalizeWords } from "../utils/capitalize";

export const AcademyRegistrationTable: TTableColumns<AcademyRegistrationTableData>[] =
  [
    {
      key: "name",
      label: "Name",
      minWidth: "160px",
      renderCell: (value: AcademyRegistrationTableData) =>
        capitalizeWords(value.name),
    },
    {
      key: "mobile",
      label: "Phone No.",
      minWidth: "160px",
      renderCell: (value: AcademyRegistrationTableData) => value.mobileNumber,
    },
    {
      key: "academyName",
      label: "Academy Name",
      minWidth: "200px",
      renderCell: (value: AcademyRegistrationTableData) => value.academyName,
    },

    {
      key: "batchType",
      label: "Batch Type",
      minWidth: "120px",
      renderCell: (value: AcademyRegistrationTableData) => value.batchType,
    },
    {
      key: "day",
      label: "Days",
      minWidth: "180px",
      renderCell: (value: AcademyRegistrationTableData) => value.day,
    },
    {
      key: "duration",
      label: "Duration",
      minWidth: "120px",
      renderCell: (value: AcademyRegistrationTableData) => (
        <div>
          <Text>months :- {value.duration.months}</Text>
          <Text>session:- {value.duration.session}</Text>
        </div>
      ),
    },
    {
      key: "batchTime",
      label: "Batch Time",
      minWidth: "180px",
      renderCell: (value: AcademyRegistrationTableData) => value.batchTime,
    },
    {
      key: "batchStartDate",
      label: "Batch Start Date",
      minWidth: "160px",
      renderCell: (value: AcademyRegistrationTableData) => value.batchStartDate,
    },

    {
      key: "amount",
      label: "Amount",
      minWidth: "160px",
      renderCell: (value: AcademyRegistrationTableData) => value.amount,
    },
    {
      key: "bookingDate",
      label: "Booking Date",
      minWidth: "140px",
      renderCell: (value: AcademyRegistrationTableData) => value.bookingDate,
    },
    {
      key: "paymentDetails",
      label: "Payment Details",
      minWidth: "240px",
      renderCell: (value: AcademyRegistrationTableData) => value.paymentDetails,
    },
    {
      key: "status",
      label: "Status",
      minWidth: "5%",
      renderCell: (value) => (
        <Chip
          checked={true}
          color={getStatusColor(value.status)}
          styles={{
            iconWrapper: { display: "none" },
          }}
        >
          {value.status.toUpperCase()}
        </Chip>
      ),
    },
  ];
const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "green";
    case "failed":
      return "red";
    case "cancel":
      return "#dc143c";

    default:
      return "yellow";
  }
};

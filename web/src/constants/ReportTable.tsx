import { Flex, Text } from "@mantine/core";
import { IReportTable } from "../types";
import ReportActionBar from "../components/ActionBar/ReportActionBar";

export const reportTable: TTableColumns<IReportTable>[] = [
  {
    key: "type",
    label: "Report Type",
    minWidth: "220px",
    renderCell: (value) => value.reportType,
  },
  {
    key: "centre",
    label: "Centres",
    minWidth: "220px",
    renderCell: (value) => (
      <Flex direction={"column"} align={"flex-start"}>
        {value.centres.map((item) => {
          return <Text key={item._id}>{item.name}</Text>;
        })}
      </Flex>
    ),
  },
  {
    key: "email",
    label: "Emails",
    minWidth: "140px",
    renderCell: (value) => (
      <Flex direction={"column"} align={"flex-start"}>
        {value.emails.split(",").map((item) => {
          return <Text key={item}>{item.trim()}</Text>;
        })}
      </Flex>
    ),
  },
  {
    key: "active",
    label: "Action",
    minWidth: "220px",
    renderCell: (value) => <ReportActionBar values={value} />,
  },
];

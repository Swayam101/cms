import moment from "moment";
import CustomerActionBar from "../components/CustomerActionBar/CustomerActionBar";
import { ICustomerData } from "../types";
import { Chip } from "@mantine/core";
import { Modals } from "../container/modals/Fmodals";
import ChangeCustomerStatusModal from "../container/modals/ChangeCustomerStatusModal/ChangeCustomerStatusModal";
import { customerStatusesMap } from "./CustomerStatuses";

export enum ESTATUS_COLORS {
  assigned = "yellow",
  new = "blue",
}

export const courtTable: (
  isUser?: boolean,
  isFreeTrial?: boolean
) => TTableColumns<ICustomerData>[] = (isUser, isFreeTrial) => {
  const table: TTableColumns<ICustomerData>[] = [
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
        <Chip
          variant="filled"
          color={ESTATUS_COLORS[value.status as keyof typeof ESTATUS_COLORS]}
          checked={true}
          onClick={() => {
            Modals({
              title: "Change Customer Status",
              children: (
                <ChangeCustomerStatusModal
                  id={value._id}
                  status={value.status}
                />
              ),
              size: "lg",
            });
          }}
        >
          {
            customerStatusesMap[
              value.status as keyof typeof customerStatusesMap
            ]
          }
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
  ];
  if (isFreeTrial) {
    table.push({
      key: "free-trial-date",
      label: "Trial Date",
      renderCell: (value) =>
        moment(new Date(value.freeTrial!.toString())).format("DD-MM-YYYY"),
    });
    table.push({
      key: "note",
      label: "Note",
      renderCell: (value) =>
        value.statusHistory[value.statusHistory.length - 1].note,
    });
  }
  if (!isUser) {
    table.push({
      key: "action",
      label: "Action",
      minWidth: "20%",
      renderCell: (value) => <CustomerActionBar id={value._id} status />,
    });
    table.push({
      key: "assigned",
      label: "Assigned To",
      minWidth: "20%",
      renderCell: (value) =>
        typeof value.assignedTo !== "string" ? value.assignedTo?.username : "-",
    });
  }
  return table;
};

import moment from "moment";
import CustomerActionBar from "../components/CustomerActionBar/CustomerActionBar";
import { ICustomerData } from "../types";
import { Chip } from "@mantine/core";
import { Modals } from "../container/modal/Fmodals";
import ChangeCustomerStatusModal from "../container/modal/ChangeCustomerStatusModal/ChangeCustomerStatusModal";

export enum ESTATUS_COLORS {
  assigned = "yellow",
  new = "blue",
}

export const courtTable: (
  isUser?: boolean
) => TTableColumns<ICustomerData>[] = (isUser) => {
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
  ];
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

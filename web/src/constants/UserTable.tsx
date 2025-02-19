import moment from "moment";
import ActionBar from "../components/ActionBar/ActionBar";
import { UserTableData } from "../types";
import { capitalizeWords } from "../utils/capitalize";

export const userTable: TTableColumns<UserTableData>[] = [
  {
    key: "name",
    label: "User Name",
    minWidth: "10%",
    renderCell: (value) => capitalizeWords(value.username),
  },
  {
    key: "action",
    label: "Action",
    minWidth: "20%",
    renderCell: (value: UserTableData) => (
      <ActionBar noDelete entity="user" id={value._id} status={value.status} />
    ),
  },
];

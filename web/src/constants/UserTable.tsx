import moment from "moment";
import ActionBar from "../components/ActionBar/ActionBar";
import { UserTableData } from "../types";
import { capitalizeWords } from "../utils/capitalize";

export const userTable: TTableColumns<UserTableData>[] = [
  {
    key: "profileImg",
    label: "Image",
    minWidth: "15%",
    renderCell: (value) => (
      <img
        src={value.profileImg ?? "/dummy.svg"}
        alt="Card"
        style={{ maxWidth: 100, borderRadius: "4px" }}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "/dummy.svg";
        }}
      />
    ),
  },
  {
    key: "name",
    label: "User Name",
    minWidth: "10%",
    renderCell: (value) => (value.name ? capitalizeWords(value.name) : "N/A"),
  },
  {
    key: "mobile",
    label: "Phone No.",
    minWidth: "10%",
    renderCell: (value) => value.mobile ?? "N/A",
  },
  {
    key: "dob",
    label: "D.O.B",
    minWidth: "5%",
    renderCell: (value) => {
      if (!value.dob) return "N/A";
      return moment(value.dob).format("DD/MM/yyyy");
    },
  },
  {
    key: "gender",
    label: "Gender",
    minWidth: "10%",
    renderCell: (value) => capitalizeWords(value.gender) ?? "N/A",
  },
  {
    key: "email",
    label: "Email",
    minWidth: "10%",
    renderCell: (value) => value.email ?? "N/A",
  },
  {
    key: "action",
    label: "Action",
    minWidth: "20%",
    renderCell: (value: UserTableData) => (
      <ActionBar entity="user" id={value._id} status={value.active} onlyEye />
    ),
  },
];

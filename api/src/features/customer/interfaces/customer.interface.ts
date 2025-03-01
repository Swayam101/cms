import { ObjectId } from "mongodb";
import { IActionHistory } from "./actionHistory.interface";

type TCustomerStatus =
  | "new"
  | "NPC"
  | "assigned"
  | "CBC"
  | "switchoff"
  | "outofservice"
  | "notintrested"
  | "intrested"
  | "freetrial";

export default [
  { label: "Not pick call", value: "NPC" },
  { label: "Call Back Later", value: "CBC" },
  { label: "Switched off", value: "switchoff" },
  { label: "Out of Service", value: "outofservice" },
  { label: "Not Intrested", value: "notintrested" },
  { label: "Intrested", value: "intrested" },
  { label: "Free Trial", value: "freetrial" },
];

export const customerStatusesMap = {
  NPC: "Not pick call",
  CBC: "Call Back Later",
  switchoff: "Switched off",
  outofservice: "Out of Service",
  notintrested: "Not Intrested",
  intrested: "Intrested",
  freetrial: "Free Trial",
  assigned: "Newly Assigned",
};

export interface ICustomer extends Document {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  assignedTo?: ObjectId;
  status?: TCustomerStatus;
  statusHistory?: IActionHistory[];
  freeTrial?: Date;
}

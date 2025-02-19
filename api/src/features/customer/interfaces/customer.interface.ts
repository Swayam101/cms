import { ObjectId } from "mongodb";
import { IActionHistory } from "./actionHistory.interface";

type TCustomerStatus = "new" | "paid" | "npc" | "assigned";

export interface ICustomer extends Document {
  name: string;
  phone: string;
  email?: string;
  assignedTo?: ObjectId;
  status?: TCustomerStatus;
  statusHistory?: IActionHistory[];
}

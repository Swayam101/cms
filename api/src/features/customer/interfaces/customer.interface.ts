import { ObjectId } from "mongodb";

type TCustomerStatus = "new" | "paid" | "npc";

export interface ICustomer extends Document {
  name: string;
  phone: string;
  email?: string;
  assignedTo?: ObjectId;
  status?: TCustomerStatus;
}

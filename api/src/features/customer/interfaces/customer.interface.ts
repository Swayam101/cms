import { ObjectId } from "mongodb";

type TCustomerStatus = "new" | "paid" | "npc";

export interface ICustomer {
  name: string;
  phone: string;
  email?: string;
  assignedTo?: ObjectId;
  status?: TCustomerStatus;
}

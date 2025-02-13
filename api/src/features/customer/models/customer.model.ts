import { Model, model, Schema } from "mongoose";
import { ICustomer } from "../interfaces/customer.interface";

const schema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: String,
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "new",
    },
  },
  { timestamps: true }
);

export default model<ICustomer>("customer", schema) as Model<ICustomer>;

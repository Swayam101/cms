import { Model, model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model("user", schema) as Model<IUser>;

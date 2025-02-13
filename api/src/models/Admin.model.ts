import { Model, model, Schema } from "mongoose";
import { IAdmin } from "../interface/admin.interface";

const schema = new Schema<IAdmin>(
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
  },
  { timestamps: true }
);

export default model("admin", schema) as Model<IAdmin>;

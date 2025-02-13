import { Model, model, Schema } from "mongoose";
import { IAuthToken } from "../interfaces/token.interface";

const schema = new Schema<IAuthToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IAuthToken>("token", schema) as Model<IAuthToken>;

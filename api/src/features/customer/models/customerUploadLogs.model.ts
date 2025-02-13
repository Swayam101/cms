import { Model, model, Schema } from "mongoose";
import { ICustomerUploadLog } from "../interfaces/customerUploadLog.interface";

const schema = new Schema<ICustomerUploadLog>(
  {
    totalUploads: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

export default model<ICustomerUploadLog>(
  "upload-log",
  schema
) as Model<ICustomerUploadLog>;

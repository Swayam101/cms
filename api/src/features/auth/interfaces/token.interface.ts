import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export interface IAuthToken extends Document {
  token: string;
  userId: ObjectId;
  purpose: "admin" | "user";
  id?: string;
}

import { Types } from "mongoose";
import { IGenericResponse, RequireAtLeastOne } from ".";
// models
import { IAdmin } from "@/models/Admin";

export interface ICreateAdminPayload {
  email: string;
  password: string;
}

export interface TGetAdmin {
  _id?: Types.ObjectId;
  email?: string;
}

export type IGetAdminPayload = RequireAtLeastOne<TGetAdmin, "_id" | "email">;

export interface IAdminResponse extends IGenericResponse<IAdmin> {}

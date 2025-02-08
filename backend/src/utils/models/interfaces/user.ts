import { Types } from "mongoose";
import { IGenericResponse, RequireAtLeastOne } from ".";
// models
import { IAvatar } from "@/models/Avatar";
import { IUser } from "@/models/User";

export interface ICreateUserPayload {
  avatar: IAvatar;
  email: string;
  emailVerified: boolean;
  onlineStatus: boolean;
  password: string;
  username: string;
}

export interface TGetUser {
  _id?: Types.ObjectId;
  email?: string;
  username?: string;
}

export type IGetUserPayload = RequireAtLeastOne<
  TGetUser,
  "_id" | "email" | "username"
>;

export interface TUpdateUser {
  avatar?: IAvatar;
  emailVerified?: number;
  onlineStatus?: boolean;
  password?: string;
  socketId?: null | string;
}

export type IUpdateUserPayload = RequireAtLeastOne<
  TUpdateUser,
  "avatar" | "emailVerified" | "onlineStatus" | "password" | "socketId"
>;

export interface IUserResponse extends IGenericResponse<IUser> {}

export interface IUsersResponse extends IGenericResponse<IUser[]> {}

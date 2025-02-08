import { Types } from "mongoose";
import { IGenericResponse, RequireAtLeastOne } from ".";
// models
import { IFollowing } from "@/models/Following";

export interface ICreateFollowingPayload {
  followerId: Types.ObjectId;
  userId: Types.ObjectId;
}

export interface IGetFollowingsPayload {
  [name: string]: Types.ObjectId;
}

export interface IFollowingResponse extends IGenericResponse<IFollowing> {}

export interface IFollowingsResponse extends IGenericResponse<IFollowing[]> {}

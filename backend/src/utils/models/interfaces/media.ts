import { Types } from "mongoose";
import { IGenericResponse, RequireAtLeastOne } from ".";
// models
import { IMedia } from "@/models/Media";

export interface ICreateMediaPayload {
  path: string;
  parentId: Types.ObjectId;
  parentType: string;
  publicId: string;
}

export interface IGetMediasPayload {
  parentId: Types.ObjectId;
  parentType: string;
}

export interface IDeleteMediaPayload {
  [name: string]: any;
}

export interface TUpdateMedia {
  path?: string;
  publicId?: string;
}

export type IUpdateMediaPayload = RequireAtLeastOne<
  TUpdateMedia,
  "path" | "publicId"
>;

export interface IMediaResponse extends IGenericResponse<IMedia> {}

export interface IMediasResponse extends IGenericResponse<IMedia[]> {}

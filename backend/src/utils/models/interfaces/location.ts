import { Types } from "mongoose";
import { IGenericResponse, RequireAtLeastOne } from ".";
// models
import { ILocation } from "@/models/Location";

export interface ICreateLocationPayload {
  address: string;
  eventId: Types.ObjectId;
  latitude: number;
  longitude: number;
}

export interface IGetLocationPayload {
  _id: Types.ObjectId;
}

export interface TUpdateLocation {
  address?: string;
  latitude?: number;
  longitude?: number;
}

export type IUpdateLocationPayload = RequireAtLeastOne<
  TUpdateLocation,
  "address" | "latitude" | "longitude"
>;

export interface ILocationResponse extends IGenericResponse<ILocation> {}

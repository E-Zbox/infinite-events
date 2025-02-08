import { Types } from "mongoose";
import { IGenericResponse, RequireAtLeastOne } from ".";
// models
import { IEventCategory } from "@/models/EventCategory";

export interface ICreateEventCategoryPayload {
  categoryId: Types.ObjectId;
  eventId: Types.ObjectId;
}

export interface IGetEventCategoryPayload {
  _id: Types.ObjectId;
}

export interface IGetEventCategoriesPayload {
  [name: string]: any;
}

export interface IEventCategoryResponse
  extends IGenericResponse<IEventCategory> {}

export interface IEventCategoriesResponse
  extends IGenericResponse<IEventCategory[]> {}

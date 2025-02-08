import { Types } from "mongoose";
import { IGenericResponse, RequireAtLeastOne } from ".";
// models
import { IAvatar } from "@/models/Avatar";
import { IEvent } from "@/models/Event";

export interface ICreateEventPayload {
  banner: IAvatar;
  description: string;
  endDate: Date;
  name: string;
  price: number;
  startDate: Date;
  registrationDeadline: Date;
  type: string;
  userId: Types.ObjectId;
}

export interface IGetEventPayload {
  _id: Types.ObjectId;
  userId?: Types.ObjectId;
}

export interface IGetEventsPayload {
  [name: string]: any;
}

export const EVENT_TIMELINE_PAST = "PAST";
export const EVENT_TIMELINE_UPCOMING = "UPCOMING";

export interface IGetEventsByTimelinePayload {
  _ids: IGetEventPayload[];
  timeline: typeof EVENT_TIMELINE_PAST | typeof EVENT_TIMELINE_UPCOMING;
}

export interface TUpdateEvent {
  banner?: IAvatar;
  description?: string;
  endDate?: Date;
  name?: string;
  price?: number;
  startDate?: Date;
  registrationDeadline?: Date;
  type?: string;
}

export type IUpdateEventPayload = RequireAtLeastOne<
  TUpdateEvent,
  | "banner"
  | "description"
  | "endDate"
  | "name"
  | "price"
  | "registrationDeadline"
  | "startDate"
  | "type"
>;

export interface IEventResponse extends IGenericResponse<IEvent> {}

export interface IEventsResponse extends IGenericResponse<IEvent[]> {}

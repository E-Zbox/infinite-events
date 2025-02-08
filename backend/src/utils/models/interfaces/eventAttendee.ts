import { Types } from "mongoose";
import { IGenericResponse, RequireAtLeastOne } from ".";
// models
import { IEventAttendee } from "@/models/EventAttendee";

export interface ICreateEventAttendeePayload {
  eventId: Types.ObjectId;
  inEvent: boolean;
  userId: Types.ObjectId;
}

export interface IGetEventAttendeePayload {
  eventId: Types.ObjectId;
  userId: Types.ObjectId;
}

export interface TGetEventAttendees {
  eventId?: Types.ObjectId;
  inEvent?: boolean;
  userId?: Types.ObjectId;
}

export type IGetEventAttendeesPayload = RequireAtLeastOne<
  TGetEventAttendees,
  "eventId" | "userId"
>;

export interface IUpdateEventAttendeePayload {
  inEvent: boolean;
}

export interface IEventAttendeeResponse
  extends IGenericResponse<IEventAttendee> {}

export interface IEventAttendeesResponse
  extends IGenericResponse<IEventAttendee[]> {}

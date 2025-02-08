import { Types } from "mongoose";
// interfaces
import { IIDPayload, INumberGenericResponse } from "./interfaces";
import {
  ICreateEventAttendeePayload,
  IEventAttendeeResponse,
  IEventAttendeesResponse,
  IGetEventAttendeePayload,
  IGetEventAttendeesPayload,
  IUpdateEventAttendeePayload,
} from "./interfaces/eventAttendee";
// errors
import { EventAttendeeError } from "../errors";
// models
import EventAttendee from "@/models/EventAttendee";

const { ObjectId } = Types;

export const createEventAttendee = async (
  payload: ICreateEventAttendeePayload
): Promise<IEventAttendeeResponse> => {
  let response: IEventAttendeeResponse = {
    data: {
      eventId: new ObjectId("0096100d95007d550608fcc0"),
      inEvent: false,
      userId: new ObjectId("0096100d95007d550608fcc0"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await EventAttendee.create(payload);

    if (!result) {
      throw new EventAttendeeError("EventAttendee creation failed!");
    }

    const { _id, eventId, inEvent, userId, createdAt, updatedAt } = result;

    response = {
      data: {
        _id,
        eventId,
        inEvent,
        userId,
        createdAt,
        updatedAt,
      },
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const getEventAttendee = async (
  payload: IIDPayload | IGetEventAttendeePayload
): Promise<IEventAttendeeResponse> => {
  let response: IEventAttendeeResponse = {
    data: {
      eventId: new ObjectId("0096100d95007d550608fcc0"),
      inEvent: false,
      userId: new ObjectId("0096100d95007d550608fcc0"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await EventAttendee.findOne(payload);

    if (!result) {
      throw new EventAttendeeError(
        `EventAttendee with payload ${JSON.stringify({
          ...payload,
        })} does not exist!`
      );
    }

    const { _id, eventId, inEvent, userId, createdAt, updatedAt } = result;

    response = {
      data: {
        _id,
        eventId,
        inEvent,
        userId,
        createdAt,
        updatedAt,
      },
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const getEventAttendees = async (
  payload: IGetEventAttendeesPayload
): Promise<IEventAttendeesResponse> => {
  let response: IEventAttendeesResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const result = await EventAttendee.find(payload);

    if (!result) {
      throw new EventAttendeeError(
        `EventAttendee with payload ${JSON.stringify(payload)} does not exist!`
      );
    }

    const data = result.map(
      ({ _id, eventId, inEvent, userId, createdAt, updatedAt }) => ({
        _id,
        eventId,
        inEvent,
        userId,
        createdAt,
        updatedAt,
      })
    );

    response = {
      data,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const updateEventAttendee = async (
  payload: IGetEventAttendeePayload,
  updatePayload: IUpdateEventAttendeePayload
): Promise<IEventAttendeeResponse> => {
  let response: IEventAttendeeResponse = {
    data: {
      eventId: new ObjectId("0096100d95007d550608fcc0"),
      inEvent: false,
      userId: new ObjectId("0096100d95007d550608fcc0"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await EventAttendee.findOneAndUpdate(
      payload,
      { ...updatePayload },
      { new: true, runValidators: true }
    );

    if (!result) {
      throw new EventAttendeeError(
        `EventAttendee with payload ${JSON.stringify({
          ...payload,
        })} update failed!`
      );
    }

    const { _id, eventId, inEvent, userId, createdAt, updatedAt } = result;

    response = {
      data: {
        _id,
        eventId,
        inEvent,
        userId,
        createdAt,
        updatedAt,
      },
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const deleteEventAttendee = async (
  payload: IGetEventAttendeePayload
): Promise<IEventAttendeeResponse> => {
  let response: IEventAttendeeResponse = {
    data: {
      eventId: new ObjectId("0096100d95007d550608fcc0"),
      inEvent: false,
      userId: new ObjectId("0096100d95007d550608fcc0"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await EventAttendee.findOneAndDelete({ ...payload });

    if (!result) {
      throw new EventAttendeeError(
        `EventAttendee with payload ${JSON.stringify({
          ...payload,
        })} deletion failed!`
      );
    }

    const { _id, eventId, inEvent, userId, createdAt, updatedAt } = result;

    response = {
      data: {
        _id,
        eventId,
        inEvent,
        userId,
        createdAt,
        updatedAt,
      },
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

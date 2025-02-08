import { Types } from "mongoose";
// interfaces
import { IIDPayload, INumberGenericResponse } from "./interfaces";
import {
  EVENT_TIMELINE_PAST,
  ICreateEventPayload,
  IEventResponse,
  IEventsResponse,
  IGetEventPayload,
  IGetEventsByTimelinePayload,
  IGetEventsPayload,
  IUpdateEventPayload,
} from "./interfaces/event";
// errors
import { EventError } from "../errors";
// models
import Event from "@/models/Event";

const { ObjectId } = Types;

export const createEvent = async (
  payload: ICreateEventPayload
): Promise<IEventResponse> => {
  let response: IEventResponse = {
    data: {
      banner: {
        path: "",
        publicId: "",
      },
      description: "",
      endDate: new Date(),
      price: 0,
      startDate: new Date(),
      name: "",
      registrationDeadline: new Date(),
      type: "",
      userId: new ObjectId("0096100d95007d550608fcc0"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Event.create(payload);

    if (!result) {
      throw new EventError("Event creation failed!");
    }

    const {
      _id,
      banner,
      description,
      endDate,
      name,
      price,
      startDate,
      registrationDeadline,
      type,
      userId,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        banner,
        description,
        endDate,
        name,
        price,
        startDate,
        registrationDeadline,
        type,
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

export const getEvent = async ({
  _id,
}: IGetEventPayload): Promise<IEventResponse> => {
  let response: IEventResponse = {
    data: {
      banner: {
        path: "",
        publicId: "",
      },
      description: "",
      endDate: new Date(),
      price: 0,
      startDate: new Date(),
      name: "",
      registrationDeadline: new Date(),
      type: "",
      userId: new ObjectId("0096100d95007d550608fcc0"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Event.findById(_id);

    if (!result) {
      throw new EventError(
        `Event with payload ${JSON.stringify({ _id })} does not exist!`
      );
    }

    const {
      banner,
      description,
      endDate,
      name,
      price,
      startDate,
      registrationDeadline,
      type,
      userId,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        banner,
        description,
        endDate,
        name,
        price,
        startDate,
        registrationDeadline,
        type,
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

export const getEvents = async (
  payload: IGetEventsPayload[],
  createdAt: -1 | 1 = -1,
  skip: number = 0
): Promise<IEventsResponse> => {
  let response: IEventsResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const result = await Event.find({ $or: payload })
      .sort({ createdAt })
      .skip(skip);

    if (!result) {
      throw new EventError(
        `Event with payload ${JSON.stringify({ ...payload })} does not exist!`
      );
    }

    const data = result.map(
      ({
        _id,
        banner,
        description,
        endDate,
        name,
        price,
        startDate,
        registrationDeadline,
        type,
        userId,
        createdAt,
        updatedAt,
      }) => ({
        _id,
        banner,
        description,
        endDate,
        name,
        price,
        startDate,
        registrationDeadline,
        type,
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

export const getPastOrUpcomingEvents = async (
  payload: IGetEventsByTimelinePayload,
  createdAt: -1 | 1 = -1,
  skip: number = 0
): Promise<IEventsResponse> => {
  let response: IEventsResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const { _ids, timeline } = payload;
    const result = await Event.find({
      endDate: {
        [timeline === EVENT_TIMELINE_PAST ? "$lt" : "$gt"]: Date.now(),
      },
      $or: _ids,
    })
      .sort({ createdAt })
      .skip(skip);

    if (!result) {
      throw new EventError(`No events found`);
    }

    const data = result.map(
      ({
        _id,
        banner,
        description,
        endDate,
        name,
        price,
        startDate,
        registrationDeadline,
        type,
        userId,
        createdAt,
        updatedAt,
      }) => ({
        _id,
        banner,
        description,
        endDate,
        name,
        price,
        startDate,
        registrationDeadline,
        type,
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

export const updateEvent = async (
  { _id }: IGetEventPayload,
  updatePayload: IUpdateEventPayload
): Promise<IEventResponse> => {
  let response: IEventResponse = {
    data: {
      banner: {
        path: "",
        publicId: "",
      },
      description: "",
      endDate: new Date(),
      price: 0,
      startDate: new Date(),
      name: "",
      registrationDeadline: new Date(),
      type: "",
      userId: new ObjectId("0096100d95007d550608fcc0"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Event.findOneAndUpdate(
      { _id },
      { ...updatePayload },
      { new: true, runValidators: true }
    );

    if (!result) {
      throw new EventError(
        `Event with payload ${JSON.stringify({ _id })} update failed!`
      );
    }

    const {
      banner,
      description,
      endDate,
      name,
      price,
      startDate,
      registrationDeadline,
      type,
      userId,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        banner,
        description,
        endDate,
        name,
        price,
        startDate,
        registrationDeadline,
        type,
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

export const deleteEvent = async (
  payload: IGetEventPayload
): Promise<IEventResponse> => {
  let response: IEventResponse = {
    data: {
      banner: {
        path: "",
        publicId: "",
      },
      description: "",
      endDate: new Date(),
      price: 0,
      startDate: new Date(),
      name: "",
      registrationDeadline: new Date(),
      type: "",
      userId: new ObjectId("0096100d95007d550608fcc0"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Event.findOneAndDelete({ ...payload });

    if (!result) {
      throw new EventError(
        `Event with payload ${JSON.stringify({ ...payload })} deletion failed!`
      );
    }

    const {
      _id,
      banner,
      description,
      endDate,
      name,
      price,
      startDate,
      registrationDeadline,
      type,
      userId,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        banner,
        description,
        endDate,
        name,
        price,
        startDate,
        registrationDeadline,
        type,
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

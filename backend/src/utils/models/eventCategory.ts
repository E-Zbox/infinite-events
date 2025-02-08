import { Types } from "mongoose";
// interfaces
import { IIDPayload, INumberGenericResponse } from "./interfaces";
import {
  ICreateEventCategoryPayload,
  IEventCategoryResponse,
  IEventCategoriesResponse,
  IGetEventCategoriesPayload,
  IGetEventCategoryPayload,
} from "./interfaces/eventCategory";
// errors
import { EventCategoryError } from "../errors";
// models
import EventCategory from "@/models/EventCategory";

const { ObjectId } = Types;

export const createEventCategory = async (
  payload: ICreateEventCategoryPayload
): Promise<IEventCategoryResponse> => {
  let response: IEventCategoryResponse = {
    data: {
      categoryId: new ObjectId("0096100d95007d550608fcc0"),
      eventId: new ObjectId("0096100d95007d550608fcc0"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await EventCategory.create(payload);

    if (!result) {
      throw new EventCategoryError("EventCategory creation failed!");
    }

    const { _id, categoryId, eventId, createdAt, updatedAt } = result;

    response = {
      data: {
        _id,
        categoryId,
        eventId,
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

export const createEventCategories = async (
  payload: ICreateEventCategoryPayload[]
): Promise<IEventCategoriesResponse> => {
  let response: IEventCategoriesResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const result = await EventCategory.create(payload);

    if (!result) {
      throw new EventCategoryError("EventCategory creation failed!");
    }

    const data = result.map(
      ({ _id, categoryId, eventId, createdAt, updatedAt }) => ({
        _id,
        categoryId,
        eventId,
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

export const getEventCategory = async ({
  _id,
}: IGetEventCategoryPayload): Promise<IEventCategoryResponse> => {
  let response: IEventCategoryResponse = {
    data: {
      categoryId: new ObjectId("0096100d95007d550608fcc0"),
      eventId: new ObjectId("0096100d95007d550608fcc0"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await EventCategory.findById(_id);

    if (!result) {
      throw new EventCategoryError(
        `EventCategory with payload ${JSON.stringify({ _id })} does not exist!`
      );
    }

    const { categoryId, eventId, createdAt, updatedAt } = result;

    response = {
      data: {
        _id,
        categoryId,
        eventId,
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

export const getEventCategories = async (
  payload: IGetEventCategoriesPayload[]
): Promise<IEventCategoriesResponse> => {
  let response: IEventCategoriesResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const result = await EventCategory.find({ $or: payload });

    if (!result) {
      throw new EventCategoryError(
        `EventCategory with payload ${JSON.stringify(payload)} does not exist!`
      );
    }

    const data = result.map(
      ({ _id, categoryId, eventId, createdAt, updatedAt }) => ({
        _id,
        categoryId,
        eventId,
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

export const deleteEventCategory = async (
  payload: IGetEventCategoryPayload
): Promise<IEventCategoryResponse> => {
  let response: IEventCategoryResponse = {
    data: {
      categoryId: new ObjectId("0096100d95007d550608fcc0"),
      eventId: new ObjectId("0096100d95007d550608fcc0"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await EventCategory.findOneAndDelete({ ...payload });

    if (!result) {
      throw new EventCategoryError(
        `EventCategory with payload ${JSON.stringify({
          ...payload,
        })} deletion failed!`
      );
    }

    const { _id, categoryId, eventId, createdAt, updatedAt } = result;

    response = {
      data: {
        _id,
        categoryId,
        eventId,
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

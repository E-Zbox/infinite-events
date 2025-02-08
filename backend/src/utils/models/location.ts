import { Types } from "mongoose";
// interfaces
import { IIDPayload, INumberGenericResponse } from "./interfaces";
import {
  ICreateLocationPayload,
  ILocationResponse,
  IGetLocationPayload,
  IUpdateLocationPayload,
} from "./interfaces/location";
// errors
import { LocationError } from "../errors";
// models
import Location from "@/models/Location";

const { ObjectId } = Types;

export const createLocation = async (
  payload: ICreateLocationPayload
): Promise<ILocationResponse> => {
  let response: ILocationResponse = {
    data: {
      address: "",
      eventId: new ObjectId("0096100d95007d550608fcc0"),
      latitude: 0,
      longitude: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Location.create(payload);

    if (!result) {
      throw new LocationError("Location creation failed!");
    }

    const { _id, address, eventId, latitude, longitude, createdAt, updatedAt } =
      result;

    response = {
      data: {
        _id,
        address,
        eventId,
        latitude,
        longitude,
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

export const getLocation = async ({
  _id,
}: IGetLocationPayload): Promise<ILocationResponse> => {
  let response: ILocationResponse = {
    data: {
      address: "",
      eventId: new ObjectId("0096100d95007d550608fcc0"),
      latitude: 0,
      longitude: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Location.findById(_id);

    if (!result) {
      throw new LocationError(
        `Location with payload ${JSON.stringify({ _id })} does not exist!`
      );
    }

    const { address, eventId, latitude, longitude, createdAt, updatedAt } =
      result;

    response = {
      data: {
        _id,
        address,
        eventId,
        latitude,
        longitude,
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

export const updateLocation = async (
  { _id }: IGetLocationPayload,
  updatePayload: IUpdateLocationPayload
): Promise<ILocationResponse> => {
  let response: ILocationResponse = {
    data: {
      address: "",
      eventId: new ObjectId("0096100d95007d550608fcc0"),
      latitude: 0,
      longitude: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Location.findOneAndUpdate(
      { _id },
      { ...updatePayload },
      { new: true, runValidators: true }
    );

    if (!result) {
      throw new LocationError(
        `Location with payload ${JSON.stringify({ _id })} update failed!`
      );
    }

    const { address, eventId, latitude, longitude, createdAt, updatedAt } =
      result;

    response = {
      data: {
        _id,
        address,
        eventId,
        latitude,
        longitude,
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

export const deleteLocation = async (
  payload: IGetLocationPayload
): Promise<ILocationResponse> => {
  let response: ILocationResponse = {
    data: {
      address: "",
      eventId: new ObjectId("0096100d95007d550608fcc0"),
      latitude: 0,
      longitude: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Location.findOneAndDelete({ ...payload });

    if (!result) {
      throw new LocationError(
        `Location with payload ${JSON.stringify({
          ...payload,
        })} deletion failed!`
      );
    }

    const { _id, address, eventId, latitude, longitude, createdAt, updatedAt } =
      result;

    response = {
      data: {
        _id,
        address,
        eventId,
        latitude,
        longitude,
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

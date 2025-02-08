import { Types } from "mongoose";
// interfaces
import { IIDPayload, INumberGenericResponse } from "./interfaces";
import {
  ICreateMediaPayload,
  IMediaResponse,
  IGetMediasPayload,
  IUpdateMediaPayload,
  IMediasResponse,
  IDeleteMediaPayload,
} from "./interfaces/media";
// errors
import { MediaError } from "../errors";
// models
import Media from "@/models/Media";

const { ObjectId } = Types;

export const createMedia = async (
  payload: ICreateMediaPayload
): Promise<IMediaResponse> => {
  let response: IMediaResponse = {
    data: {
      path: "",
      parentId: new ObjectId("0096100d95007d550608fcc0"),
      parentType: "",
      publicId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Media.create(payload);

    if (!result) {
      throw new MediaError("Media creation failed!");
    }

    const { _id, path, parentId, parentType, publicId, createdAt, updatedAt } =
      result;

    response = {
      data: {
        _id,
        path,
        parentId,
        parentType,
        publicId,
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

export const getMedias = async (
  payload: IGetMediasPayload
): Promise<IMediasResponse> => {
  let response: IMediasResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const result = await Media.find(payload);

    if (!result) {
      throw new MediaError(
        `Media with payload ${JSON.stringify(payload)} does not exist!`
      );
    }

    const data = result.map(
      ({ path, parentId, parentType, publicId, createdAt, updatedAt }) => ({
        path,
        parentId,
        parentType,
        publicId,
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

export const updateMedia = async (
  { _id }: IIDPayload,
  updatePayload: IUpdateMediaPayload
): Promise<IMediaResponse> => {
  let response: IMediaResponse = {
    data: {
      path: "",
      parentId: new ObjectId("0096100d95007d550608fcc0"),
      parentType: "",
      publicId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Media.findOneAndUpdate(
      { _id },
      { ...updatePayload },
      { new: true, runValidators: true }
    );

    if (!result) {
      throw new MediaError(
        `Media with payload ${JSON.stringify({ _id })} update failed!`
      );
    }

    const { path, parentId, parentType, publicId, createdAt, updatedAt } =
      result;

    response = {
      data: {
        _id,
        path,
        parentId,
        parentType,
        publicId,
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

export const deleteMedias = async (
  payload: IDeleteMediaPayload[]
): Promise<INumberGenericResponse> => {
  let response: INumberGenericResponse = {
    data: 0,
    error: "",
    success: false,
  };

  try {
    const { deletedCount: result } = await Media.deleteMany({ $and: payload });

    if (!result) {
      throw new MediaError(
        `Media with payload ${JSON.stringify({
          ...payload,
        })} deletion failed!`
      );
    }

    response = {
      data: result,
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

import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
// utils/config
import { checkForObjectKeys } from "@/utils/config/check";
// utils/errors
import { FileUploadError, RequestBodyError } from "@/utils/errors";
// utils/models
import { createEvent, getEvent, updateEvent } from "@/utils/models/event";
import cloudinary from "@/config/cloudinary";
import { ICreateEventCategoryPayload } from "@/utils/models/interfaces/eventCategory";
import { getCategory } from "@/utils/models/category";
import { createEventCategories } from "@/utils/models/eventCategory";
import { IUpdateEventPayload } from "@/utils/models/interfaces/event";

const { ObjectId } = Types;

export const createEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const {
      categoryIds,
      description,
      endDate,
      name,
      price,
      registrationDeadline,
      startDate,
      type,
    } = req.body;

    const errorMessage = checkForObjectKeys(
      [
        "categoryIds",
        "description",
        "endDate",
        "name",
        "price",
        "registrationDeadline",
        "startDate",
        "type",
      ],
      req.body
    );

    if (errorMessage) {
      throw new RequestBodyError(errorMessage);
    }

    // check if media was passed
    if (!req.file) {
      throw new FileUploadError(
        "Missing `bannerImage` field with uploaded image"
      );
    }

    let eventCategoryPayload: ICreateEventCategoryPayload[] = [];

    // check if categoryId(s) exists
    if (typeof categoryIds == "string") {
      const categoryId = new ObjectId(categoryIds);
      const categoryExists = await getCategory({ _id: categoryId });

      if (!categoryExists.success) {
        throw categoryExists.error;
      }
      eventCategoryPayload.push({
        categoryId,
        eventId: new ObjectId("0096100d95007d550608fcc0"),
      });
    }

    if (Array.isArray(categoryIds)) {
      categoryIds.every(async (_id: string) => {
        const categoryId = new ObjectId(_id);
        const categoryExists = await getCategory({ _id: categoryId });

        if (!categoryExists.success) {
          throw categoryExists.error;
        }
        eventCategoryPayload.push({
          categoryId,
          eventId: new ObjectId("0096100d95007d550608fcc0"),
        });
      });
    } else if (eventCategoryPayload.length == 0) {
      throw new RequestBodyError(
        "`categoryIds` can be a single category Id or an array of category Ids"
      );
    }

    const { _id: userId } = req.user;

    const { filename: publicId, path } = req.file;

    const { data, error, success } = await createEvent({
      banner: {
        path,
        publicId,
      },
      description,
      endDate,
      name,
      price,
      registrationDeadline,
      type,
      startDate,
      userId,
    });

    if (!success) {
      throw error;
    }

    // create eventCategories
    eventCategoryPayload = eventCategoryPayload.map(({ categoryId }) => ({
      categoryId,
      eventId: data._id!,
    }));

    const newEventCategories = await createEventCategories(
      eventCategoryPayload
    );

    if (!newEventCategories.success) {
      throw newEventCategories.error;
    }

    return res.status(201).json({ data, error, success });
  } catch (error) {
    if (req.file) {
      const { filename } = req.file;

      await cloudinary.api.delete_resources([filename]);
    }
    next(error);
  }
};

export const updateEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { description, name, registrationDeadline } = req.body;
    const { eventId } = req.params;

    // check if eventExists
    let { data, error, success } = await getEvent({
      _id: new ObjectId(eventId),
    });

    if (!success) {
      throw error;
    }

    const updatePayload: IUpdateEventPayload = {
      type: data.type,
    };

    if (description) {
      updatePayload["description"] = description;
    }
    if (name) {
      updatePayload["name"] = name;
    }
    if (registrationDeadline) {
      updatePayload["registrationDeadline"] = registrationDeadline;
    }
    let oldFilePublicId: null | string = null;
    if (req.file) {
      oldFilePublicId = data.banner.publicId;

      const { filename: publicId, path } = req.file;
      updatePayload["banner"] = {
        path,
        publicId,
      };
    }

    // update event
    ({ data, error, success } = await updateEvent(
      { _id: data._id! },
      updatePayload
    ));

    if (!success) {
      throw error;
    }

    // delete old file if replaced
    if (oldFilePublicId) {
      await cloudinary.api.delete_resources([oldFilePublicId]);
    }

    return res.status(201).json({ data, error, success });
  } catch (error) {
    if (req.file) {
      const { filename } = req.file;

      await cloudinary.api.delete_resources([filename]);
    }
    next(error);
  }
};

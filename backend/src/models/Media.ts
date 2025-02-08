import { model, Model, Schema, Types } from "mongoose";
// .
import { MEDIA_PARENT_EVENT } from ".";
import cloudinary from "@/config/cloudinary";
import { EventError, InvalidEnumError } from "@/utils/errors";
import Event from "./Event";

const { ObjectId } = Schema;

export interface IMedia {
  _id?: Types.ObjectId;
  path: string;
  parentId: Types.ObjectId;
  parentType: string;
  publicId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IMediaSchema extends Model<IMedia>, IMedia {}

const mediaSchema = new Schema<IMediaSchema>(
  {
    path: {
      required: [true, "`path` field is required"],
      type: String,
    },
    parentId: {
      required: [true, "`parentId` field is required"],
      type: ObjectId,
    },
    parentType: {
      enum: [MEDIA_PARENT_EVENT],
      required: [true, "`parentType` field is required"],
      type: String,
    },
    publicId: {
      required: [true, "`publicId` field is required"],
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

mediaSchema.index({ parentId: 1, parentType: 1 }, { unique: true });

mediaSchema.pre("save", async function (next) {
  try {
    const { parentId, parentType } = this;
    switch (parentType) {
      case MEDIA_PARENT_EVENT:
        const eventExists = await Event.findById(parentId);

        if (!eventExists) {
          throw new EventError(
            `Event with payload ${JSON.stringify({ parentId })}`
          );
        }
        break;
      default:
        throw new InvalidEnumError(
          `Unknown value passed as parentType: '${parentType}'`
        );
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

export default model("Media", mediaSchema);

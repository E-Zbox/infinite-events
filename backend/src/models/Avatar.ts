import { Model, Schema } from "mongoose";

export interface IAvatar {
  path: null | string;
  publicId: null | string;
}

interface IAvatarSchema extends Model<IAvatar>, IAvatar {}

export const avatarSchema = new Schema<IAvatarSchema>(
  {
    path: {
      required: [false, "`path` field is required"],
      type: String,
    },
    publicId: {
      required: [false, "`publicId` field is required"],
      type: String,
    },
  },
  {
    _id: false,
  }
);

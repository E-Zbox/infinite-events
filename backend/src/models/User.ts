import { model, Model, Schema, Types } from "mongoose";
// .
import { avatarSchema, IAvatar } from "./Avatar";

const { ObjectId } = Schema;

export interface IUser {
  _id?: Types.ObjectId;
  avatar: IAvatar;
  email: string;
  emailVerified: boolean;
  onlineStatus: boolean;
  password: string;
  socketId: null | string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserSchema extends Model<IUser>, IUser {}

const userSchema = new Schema<IUserSchema>(
  {
    avatar: {
      required: [true, "`avatar` field is required"],
      type: avatarSchema,
    },
    email: {
      required: [true, "`email` field is required"],
      type: String,
      unique: true,
    },
    emailVerified: {
      default: false,
      required: [true, "`emailVerified` field is required"],
      type: Boolean,
    },
    onlineStatus: {
      required: [true, "`onlineStatus` field is required"],
      type: Boolean,
    },
    password: {
      required: [true, "`password` field is required"],
      type: String,
    },
    socketId: {
      required: false,
      type: String,
    },
    username: {
      required: [true, "`username` field is required"],
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);

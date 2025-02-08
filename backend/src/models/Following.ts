import { model, Model, Schema, Types } from "mongoose";
// .
import User from "./User";
// errors
import { UserError } from "@/utils/errors";

const { ObjectId } = Schema;

export interface IFollowing {
  _id?: Types.ObjectId;
  followerId: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFollowingSchema extends Model<IFollowing>, IFollowing {}

const followingSchema = new Schema<IFollowingSchema>(
  {
    followerId: {
      required: [true, "`followerId` field is required"],
      type: ObjectId,
    },
    userId: {
      required: [true, "`userId` field is required"],
      type: ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

followingSchema.index({ following: 1, userId: 1 }, { unique: true });

followingSchema.pre("save", async function (next) {
  try {
    const { followerId, userId } = this;

    const followerExists = await User.findById(followerId);

    if (!followerExists) {
      throw new UserError(
        `User with payload ${JSON.stringify({ followerId })} does not exist!`
      );
    }

    const userExists = await User.findById(userId);

    if (!userExists) {
      throw new UserError(
        `User with payload ${JSON.stringify({
          userId,
        })} does not exist!`
      );
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

export default model("Following", followingSchema);

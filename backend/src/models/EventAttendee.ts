import { model, Model, Schema, Types } from "mongoose";
// .
import Event from "./Event";
import User from "./User";
// errors
import { EventError, UserError } from "@/utils/errors";

const { ObjectId } = Schema;

export interface IEventAttendee {
  _id?: Types.ObjectId;
  eventId: Types.ObjectId;
  inEvent: boolean;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface IEventAttendeeSchema extends Model<IEventAttendee>, IEventAttendee {}

const eventAttendeeSchema = new Schema<IEventAttendeeSchema>(
  {
    eventId: {
      required: [true, "`eventId` field is required"],
      type: ObjectId,
    },
    inEvent: {
      required: [true, "`inEvent` field is required"],
      type: Boolean,
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

eventAttendeeSchema.index({ eventId: 1, userId: 1 });

eventAttendeeSchema.pre("save", async function (next) {
  try {
    const { eventId, userId } = this;
    const eventExists = await Event.findById(eventId);

    if (!eventExists) {
      throw new EventError(
        `Event with payload ${JSON.stringify({ eventId })} does not exist!`
      );
    }

    const userExists = await User.findById(userId);

    if (!userExists) {
      throw new UserError(
        `User with payload ${JSON.stringify({ userId })} does not exist!`
      );
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

export default model("EventAttendee", eventAttendeeSchema);

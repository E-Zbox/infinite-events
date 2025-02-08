import { Model, model, Schema, Types } from "mongoose";
// .
import { EVENT_TYPE_HYBRID, EVENT_TYPE_PHYSICAL, EVENT_TYPE_VIRTUAL } from ".";
import { avatarSchema, IAvatar } from "./Avatar";
import User from "./User";
// errors
import { EventError, UserError } from "@/utils/errors";
import EventAttendee from "./EventAttendee";

const { ObjectId } = Schema;

export interface IEvent {
  _id?: Types.ObjectId;
  banner: IAvatar;
  description: string;
  endDate: Date;
  name: string;
  price: number;
  registrationDeadline: Date;
  startDate: Date;
  type: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface IEventSchema extends Model<IEvent>, IEvent {}

const eventSchema = new Schema<IEventSchema>(
  {
    banner: {
      required: [true, "`banner` field is required"],
      type: avatarSchema,
    },
    description: {
      required: [true, "`description` field is required"],
      type: String,
    },
    endDate: {
      // event start date
      required: [true, "`endDate` field is required"],
      type: Date,
    },
    name: {
      required: [true, "`name` field is required"],
      type: String,
    },
    price: {
      min: 1,
      required: [true, "`price` field is required"],
      type: Number,
    },
    registrationDeadline: {
      required: [true, "`registrationDeadline` field is required"],
      type: Date,
    },
    startDate: {
      required: [true, "`startDate` field is required"],
      type: Date,
    },
    type: {
      enum: [EVENT_TYPE_HYBRID, EVENT_TYPE_PHYSICAL, EVENT_TYPE_VIRTUAL],
      required: [true, "`type` field is required"],
      type: String,
    },
    userId: {
      // owner
      required: [true, "`userId` field is required"],
      type: ObjectId,
      validate: {
        validator: async (id: Types.ObjectId): Promise<boolean> => {
          const userExists = await User.findById(id);

          if (!userExists) {
            throw new UserError(
              `User with payload ${JSON.stringify({ id })} does not exist!`
            );
          }

          return true;
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.pre("save", function (next) {
  try {
    const { endDate, startDate, registrationDeadline } = this;

    if (endDate < new Date(Date.now())) {
      throw new EventError("`endDate` for event cannot be back dated");
    }
    if (startDate < new Date(Date.now())) {
      throw new EventError("`startDate` for event cannot be back dated");
    }
    if (registrationDeadline < new Date(Date.now())) {
      throw new EventError(
        "`registrationDeadline` for event cannot be back dated"
      );
    }
    if (endDate < startDate) {
      throw new EventError("Event `endDate` cannot be before `startDate`");
    }
    if (endDate < registrationDeadline) {
      throw new EventError(
        "Event `endDate` cannot be before `registrationDeadline`"
      );
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

eventSchema.post("save", async function (doc) {
  // i am first event attendee
  await EventAttendee.create({
    eventId: doc._id,
    inEvent: false,
    userId: doc.userId,
  });
});

export default model("Event", eventSchema);

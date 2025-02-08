import { Model, model, Schema, Types } from "mongoose";
// .
import Event from "./Event";
// errors
import { EventError } from "@/utils/errors";

const { ObjectId } = Schema;

export interface ILocation {
  _id?: Types.ObjectId;
  address: string;
  eventId: Types.ObjectId;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ILocationSchema extends Model<ILocation>, ILocation {}

const locationSchema = new Schema<ILocationSchema>(
  {
    address: {
      required: [true, "`address` field is required"],
      type: String,
    },
    eventId: {
      required: [true, "`eventId` field is required"],
      type: ObjectId,
      unique: true,
      validate: {
        validator: async (value: Types.ObjectId) => {
          const eventExists = await Event.findById(value);

          if (!eventExists) {
            throw new EventError(
              `Event with payload ${JSON.stringify({
                id: value,
              })} does not exist!`
            );
          }

          return true;
        },
      },
    },
    latitude: {
      required: [true, "`latitude` field is required"],
      type: Number,
    },
    longitude: {
      required: [true, "`latitude` field is required"],
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Location", locationSchema);

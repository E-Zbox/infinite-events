import { Model, model, Schema, Types } from "mongoose";
// .
import Event from "./Event";
// errors
import { EventError } from "@/utils/errors";

const { ObjectId } = Schema;

export interface IVirtualLocation {
  _id?: Types.ObjectId;
  address: string;
  eventId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface IVirtualLocationSchema
  extends Model<IVirtualLocation>,
    IVirtualLocation {}

const virtualLocationSchema = new Schema<IVirtualLocationSchema>(
  {
    address: {
      required: [true, "`address` field is required"],
      type: String,
    },
    eventId: {
      required: [true, "`eventId` field is required"],
      type: ObjectId,
      validate: {
        validator: async (value: typeof ObjectId) => {
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
  },
  {
    timestamps: true,
  }
);

virtualLocationSchema.index({ address: 1, eventId: 1 }, { unique: true });

export default model("VirtualLocation", virtualLocationSchema);

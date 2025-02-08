import { model, Model, Schema, Types } from "mongoose";
// .
import Category from "./Category";
import Event from "./Event";
// errors
import { CategoryError, EventError } from "@/utils/errors";

const { ObjectId } = Schema;

export interface IEventCategory {
  _id?: Types.ObjectId;
  categoryId: Types.ObjectId;
  eventId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface IEventCategorySchema extends Model<IEventCategory>, IEventCategory {}

const eventCategorySchema = new Schema<IEventCategorySchema>(
  {
    categoryId: {
      required: [true, "`categoryId` field is required"],
      type: ObjectId,
    },
    eventId: {
      required: [true, "`eventId` field is required"],
      type: ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

eventCategorySchema.index({ categoryId: 1, eventId: 1 }, { unique: true });

eventCategorySchema.pre("save", async function (next) {
  try {
    const { categoryId, eventId } = this;
    const categoryExists = await Category.findById(categoryId);

    if (!categoryExists) {
      throw new CategoryError(
        `Category with payload ${JSON.stringify({
          categoryId,
        })} does not exist!`
      );
    }

    const eventExists = await Event.findById(eventId);

    if (!eventExists) {
      throw new EventError(
        `Event with payload ${JSON.stringify({ eventId })} does not exist!`
      );
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

export default model("EventCategory", eventCategorySchema);

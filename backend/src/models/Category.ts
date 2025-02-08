import { model, Model, Schema, Types } from "mongoose";

const { ObjectId } = Schema;

export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ICategorySchema extends Model<ICategory>, ICategory {}

const categorySchema = new Schema<ICategorySchema>(
  {
    name: {
      required: [true, "`name` field is required"],
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Category", categorySchema);

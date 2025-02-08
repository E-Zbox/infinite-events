import { model, Model, Schema, Types } from "mongoose";

const { ObjectId } = Schema;

export interface IAdmin {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IAdminSchema extends Model<IAdmin>, IAdmin {}

const adminSchema = new Schema<IAdminSchema>(
  {
    email: {
      required: [true, "`email` field is required"],
      type: String,
    },
    password: {
      required: [true, "`password` field is required"],
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Admin", adminSchema);

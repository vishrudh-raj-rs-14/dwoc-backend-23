import { Document, Types, ObjectId, model, Schema } from "mongoose";

interface demoInterface extends Document {
  content: string;
}

const demoSchema = new Schema<demoInterface>(
  {
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const demoModel = model<demoInterface>("demo", demoSchema);

export default demoModel;

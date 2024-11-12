import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

export const Courses = mongoose.model("courses", coursesSchema);

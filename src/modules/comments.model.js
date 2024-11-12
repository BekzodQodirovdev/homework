import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    article_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "articles",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
  },
  {
    timestamps: true,
  }
);

export const Comments = mongoose.model("comments", coursesSchema);

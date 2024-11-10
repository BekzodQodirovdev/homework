import mongoose from "mongoose";

const artclSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoriy",
    },
  },
  {
    timestamps: true,
  }
);

export const Articles = mongoose.model("articles", artclSchema);

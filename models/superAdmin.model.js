import mongoose from "mongoose";
import { config } from "dotenv";

config();

const { connect, model, Schema } = mongoose;

const db_uri = process.env.MONGO_URI;

connect(db_uri);

const adminSchema = new Schema(
  {
    name: String,
    email: {
      type : String,
      unique: true
    },
    password: String,
    role: {
      enum: ["superadmin"],
    },
  },
  {
    timestamps: true,
  }
);

export const Super = model("superadmin", adminSchema);

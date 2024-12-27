import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
    user_id: String,
    key: String,
    value: String,
});

export const Data = mongoose.model("data", dataSchema);

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    user_id: String,
    username: String,
    first_name: String,
    phone_number: String,
});

export const User = mongoose.model("users", userSchema);

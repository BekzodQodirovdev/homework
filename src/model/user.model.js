import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    user_id: String,
    username: String,
    first_name: String,
    phone_number: String,
    add_status: {
        type: String,
        enum: ["add", "key","find", false],
        default: false,
    },
});

export const User = mongoose.model("users", userSchema);

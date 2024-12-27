import express from "express";
import mongoose from "mongoose";

import { bot } from "./src/bot/index.js";
(async () => {
    await bot.start();
    console.log("Bot running");
})();

export * from "./src/command/index.js";
export * from "./src/action/index.js";

const app = express();

const port = process.env.PORT ?? 4001;
const dbUrl = process.env.MONGO_URI;

app.listen(port, async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connect to MongoDB");
        console.log(`Server running`);
    } catch (error) {
        console.log(error);
    }
});

// setTimeout(async ()=>{
//   const botInfo = await bot.api.getMe();
//   console.log(botInfo)
// }, 1000)

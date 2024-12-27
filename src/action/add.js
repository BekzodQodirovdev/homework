import { bot } from "../bot/index.js";
import { User } from "../model/user.model.js";

bot.hears("Qo'shish +", async (ctx) => {
    await User.findOneAndUpdate(
        { user_id: ctx.from.id },
        { add_status: "add" }
    );

    await ctx.reply("Istagan ma'lumot turini menga jo'nating 🙂...");
});

import { bot } from "../bot/index.js";

bot.hears("Qo'shish +", async (ctx) => {
    ctx.session.add_status = "add";

    await ctx.reply("Istagan ma'lumot turini menga jo'nating 🙂...");
});

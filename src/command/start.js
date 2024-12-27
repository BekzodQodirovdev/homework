import { Keyboard } from "grammy";
import { bot } from "../bot/index.js";
import { User } from "../model/user.model.js";

bot.command("start", async (ctx) => {
    const newUserId = ctx.from.id;
    const username = ctx.from.username || "";
    const first_name = ctx.from.first_name || "";

    const user = await User.findOne({ user_id: newUserId });
    if (!user) {
        const newUser = new User({
            user_id: newUserId,
            username,
            first_name,
            add_status: false,
        });
        await newUser.save();
    }

    await ctx.reply(`Assalamu alaykum, ${first_name}! 🎉`);
    await ctx.reply(
        `Cho'ntak bot orqali siz har qanday ma'lumotni saqlab, uni telegramdagi ixtiyoriy chatga tezlik bilan jo'natish imkoniga ega bo'lasiz! 

Ma'lumot qo'shish uchun pastdagi 'Qo'shish' tugmasini bosing va kalit so'z bering.`,
        {
            reply_markup: new Keyboard().text(`Qo'shish +`).oneTime().resized(),
        }
    );
});

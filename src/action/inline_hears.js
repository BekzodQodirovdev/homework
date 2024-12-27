import { bot } from "../bot/index.js";
import { User } from "../model/user.model.js";
import { Data } from "../model/data.model.js";

bot.on("callback_query:data", async (ctx) => {
    try {
        const callbackData = ctx.callbackQuery.data;
        if (callbackData.startsWith("ok")) {
            await User.findOneAndUpdate(
                { user_id: ctx.from.id },
                { add_status: "find" }
            );
            ctx.reply(`Ma'lumot muvaffaqiyatli qo'shildi! 🥳 

 👉@chontak_bot kalit so'z👈 
shu jumlani Telegramdagi istagan chatga yozish orqali saqlangan ma'lumotni jo'natishingiz mumkin!`);
        } else if (callbackData.startsWith("update")) {
            await User.findOneAndUpdate(
                { user_id: ctx.from.id },
                { add_status: "add" }
            );
            await ctx.reply(`Qaytadan boshlaymizmi? 

Ok! 

Istagan ma'lumot turini menga jo'nating 🙂...`);
        } else if (callbackData.startsWith("all")) {
            const allData = await Data.find({ user_id: ctx.from.id });
            let updateData = "";
            for (let item of allData) {
                updateData += `key: ${item.key}\nvalue: ${item.value}\n\n`;
            }
            await ctx.reply(updateData || "Hozircha ma'lumot mavjud emas.");
        } else if (callbackData.startsWith("key")) {
            await User.findOneAndUpdate(
                { user_id: ctx.from.id },
                { add_status: "find" }
            );
            return ctx.reply("Keyni kiriting");
        }
    } catch (err) {
        console.log(err);
    }
});

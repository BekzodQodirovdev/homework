import { addReplyParam } from "@roziscoding/grammy-autoquote";
import { bot } from "../bot/index.js";
import { User } from "../model/user.model.js";
import { Data } from "../model/data.model.js";

bot.on("message", async (ctx) => {
    const user_id = ctx.update.message.from.id;
    const user = await User.findOne({ user_id });
    if (!user) {
        return await ctx.reply(`👉 "/start" `);
    } else if (user.add_status) {
        if (user.add_status == "add") {
            const value = ctx.message.text;
            ctx.api.config.use(addReplyParam(ctx));
            await User.findOneAndUpdate(
                { user_id: ctx.from.id },
                { add_status: "key" }
            );
            const replayData = new Data({
                user_id: ctx.from.id,
                key: "",
                value,
            });
            await replayData.save();

            await ctx.reply(`Endi kalit so'z yuboring! 
    
    Aynan shu kalit so'z orqali bu ma'lumotni chatda jo'natasiz. Shuning uchun, kalit so'zni eslab qoling!`);
        } else if (user.add_status == "key") {
            const key = ctx.message.text;
            const dataId = await Data.findOneAndUpdate(
                { user_id: ctx.from.id },
                { key }
            );
            const data = await Data.findOne({ _id: dataId });
            await ctx.reply(`Kalit so'z : ${data.key}
Tekst : ${data.value}`);
            await ctx.reply("Endi ma'lumot va kalit so'zni tasdiqlang!", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "✅ Tasdiqlansin",
                                callback_data: `ok=${data._id}`,
                            },
                            {
                                text: "✍️ Tahrirlash",
                                callback_data: `update=${data._id}`,
                            },
                        ],
                    ],
                },
            });
        } else if (user.add_status == "find") {
            const key = ctx.message.text;
            await User.findOneAndUpdate(
                { user_id: ctx.from.id },
                { add_status: false }
            );
            const data = await Data.findOne({ user_id: ctx.from.id, key });
            if (data) {
                await ctx.reply(`key: ${data.key}\nvalue: ${data.value}`);
            } else {
                await ctx.reply("Bunday kalit mavjud emas.");
            }
        }
    }
});

import { addReplyParam } from "@roziscoding/grammy-autoquote";
import { bot } from "../bot/index.js";
import { User } from "../model/user.model.js";
import { Data } from "../model/data.model.js";

bot.on("message", async (ctx) => {
    const user_id = ctx.update.message.from.id;
    const user = await User.findOne({ user_id });
    if (!user) {
        return await ctx.reply(`👉 "/start" `);
    } else if (ctx.session.add_status) {
        if (ctx.session.add_status == "add") {
            const value = ctx.message.text;
            ctx.api.config.use(addReplyParam(ctx));

            ctx.session.add_status = "key";
            ctx.session.value = value;

            await ctx.reply(`Endi kalit so'z yuboring!
    
    Aynan shu kalit so'z orqali bu ma'lumotni chatda jo'natasiz. Shuning uchun, kalit so'zni eslab qoling!`);
        } else if (ctx.session.add_status == "key") {
            ctx.session.add_status = "";
            const key = ctx.message.text;
            ctx.session.key = key;
            const data = { key: ctx.session.key, value: ctx.session.value };
            await ctx.reply(`Kalit so'z : ${data.key}
Value : ${data.value}`);
            await ctx.reply("Endi ma'lumot va kalit so'zni tasdiqlang!", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "✅ Tasdiqlansin",
                                callback_data: `ok`,
                            },
                            {
                                text: "✍️ Tahrirlash",
                                callback_data: `update`,
                            },
                        ],
                    ],
                },
            });
        } else if (ctx.session.add_status == "find") {
            const key = ctx.message.text;
            const data = await Data.findOne({ user_id: ctx.from.id, key });
            if (data) {
                await ctx.reply(`key: ${data.key}\nvalue: ${data.value}`);
            } else {
                await ctx.reply("Bunday kalit mavjud emas.");
            }
            ctx.session.find = "";
        }
    }
});

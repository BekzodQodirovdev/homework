import { bot } from "../bot/index.js";
import { User } from "../model/user.model.js";
import { Data } from "../model/data.model.js";

bot.on("callback_query:data", async (ctx) => {
    try {
        const callbackData = ctx.callbackQuery.data;
        if (callbackData.startsWith("ok")) {
            let data = {
                user_id: ctx.from.id,
                key: ctx.session.key,
                value: ctx.session.value,
            };
            const saveData = new Data(data);
            await saveData.save();
            ctx.reply(`Ma'lumot muvaffaqiyatli qo'shildi! 🥳 

 👉@chontak_bot kalit so'z👈 
shu jumlani Telegramdagi istagan chatga yozish orqali saqlangan ma'lumotni jo'natishingiz mumkin!`);
        } else if (callbackData.startsWith("update")) {
            ctx.session.add_status = "add";
            ctx.session.key = "";
            ctx.session.value = "";
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
            ctx.session.add_status = "find";
            await ctx.reply("Keyni kiriting");
        }
    } catch (err) {
        console.log(err);
    }
});

bot.inlineQuery(/.*/, async (ctx) => {
    const query = ctx.inlineQuery.query;
    const data = await Data.find();
    let res = [];
    let idx = 1;
    for (const obj of data) {
        let s = {
            type: "article",
            id: `${idx++}`,
            title: obj.key,
            input_message_content: {
                message_text: obj.value,
            },
            description: "@chontakorgbot",
        };
        res.push(s);
    }
    await ctx.answerInlineQuery(res);
});

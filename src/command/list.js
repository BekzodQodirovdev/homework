import { bot } from "../bot/index.js";

bot.command("list", async (ctx) => {
    await ctx.reply("Quyidagilardan birini tanlang", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Barchasini chiqarish",
                        callback_data: `all`,
                    },
                    {
                        text: "key bo'yicha",
                        callback_data: `key`,
                    },
                ],
            ],
        },
    });
});

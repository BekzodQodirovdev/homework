import { bot } from "../bot/index.js";

bot.command("list", async (ctx) => {
    const data = "data";

    await ctx.reply("Quyidagilardan birini tanlang", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Barchasini chiqarish",
                        callback_data: `all=${data}`,
                    },
                    {
                        text: "key bo'yicha",
                        callback_data: `key=${data}`,
                    },
                ],
            ],
        },
    });
});

import pkg from "grammy";
const { Bot } = pkg;

// Botni yaratish
const bot = new Bot("");

// Inline querylarni qayta ishlash

bot.inlineQuery(/.*/, async (ctx) => {
    const query = ctx.inlineQuery.query;

    const results = [
        {
            type: "article",
            id: "1",
            title: "Salom!",
            input_message_content: {
                message_text:
                    "Assalomu alaykum! Siz `Salom!` tugmasini bosdingiz.",
            },
            description: "Salom matnini yuboradi",
        },
        {
            type: "article",
            id: "2",
            title: `Siz qidirdingiz: "${query}"`,
            input_message_content: {
                message_text: `Siz "${query}" deb qidirdingiz.`,
            },
            description: "Foydalanuvchi so'rovini ko'rsatadi",
        },
    ];

    await ctx.answerInlineQuery(results);
});

// Botni ishga tushirish
bot.start();

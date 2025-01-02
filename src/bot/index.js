import { Bot, session } from "grammy";

export const bot = new Bot(process.env.BOT_TOKEN);

function initialSession() {
    return {
        add_status: "",
        key: "",
        value: "",
    };
}

bot.use(session({ initial: initialSession }));

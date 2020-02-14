require("dotenv").config();
const discord = require("discord.js");
const bot = new discord.Client()
const api_key = process.env.API_KEY
bot.login(api_key);

bot.once("ready", () => {
    console.log("connected");
})

const opgg = require("op.gg-api");

const parser = require("discord-command-parser");
const prefix = "!";



bot.on("message", (msg) => {
    const parsed_msg = parser.parse(msg, prefix);
    if (parsed_msg.command === "register") {
        msg.channel.send(`SHUT UP ${parsed_msg.arguments[0]}`);

    }
})

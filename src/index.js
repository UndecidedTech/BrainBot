require("dotenv").config();
const discord = require("discord.js");

const bot = new discord.Client()

const api_key = process.env.API_KEY

console.log("api_key: ", api_key);
bot.login(api_key);

bot.once("ready", () => {
    console.log("connected");
})

bot.on("message", (msg) => {
    if (msg.content === "!alex"){
        msg.channel.send("SHUT UP")
    }
})

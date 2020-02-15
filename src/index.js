require("dotenv").config();
const discord = require("discord.js");
const bot = new discord.Client()
const api_key = process.env.API_KEY
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const fs =require('fs')
bot.login(api_key);

bot.once("ready", () => {
    console.log("connected");
})


const opgg = require("op.gg-api");

const parser = require("discord-command-parser");
const prefix = "&";

bot.on("ready", () => {
    console.log("BrainBot is Online")
})
bot.on("reconnecting", () => {
    console.log("BrainBot is attempting to Reconnect")
})
bot.on('message', async message => {
    if (message.content === '&play'){
        if (message.member.voiceChannel) {
            const connection = await message.member.voiceChannel.join()
            const stream = fs.createReadStream('https://www.youtube.com/watch?v=9fWxCIi5PIw')
            connection.playStream(stream)
                //const dispatcher = connection.playStream(ytdl('https://www.youtube.com/watch?v=9fWxCIi5PIw',{ format: 'audioonly'}))
            
            
        }else {
            message.reply('You need to join a voice channel first')
        }
    }
})

/*bot.on("message",  async (msg) => {
    const parsed_msg = parser.parse(msg, prefix);
    if (parsed_msg.command === "register") {
        msg.channel.send(`SHUT UP ${parsed_msg.arguments[0]}`);

    }else if (parsed_msg.command === "come") {
        const channel = msg.member.voiceChannel;
        summonBot(channel)
    }else if (parsed_msg.command === "play") {
        
    }

    
})
function summonBot (channel) {
    channel.join()
    .then(connection => console.log("Connected to Voice Channel"))
    .catch(console.error)
}
 /*function playMusic (channel) {
    channel.join().then(connection => {
    let dispatcher =  connection.play('/home/twigie/Projects/BrainBot/Assets/dr.mp3', {volume: 1 })
    
    });
}*/

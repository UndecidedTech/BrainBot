require("dotenv").config();
const discord = require("discord.js");
const bot = new discord.Client()
const api_key = process.env.API_KEY
const ytdl = require('ytdl-core');
const ytdlDiscord = require("ytdl-core-discord");
const streamOptions = {
  seek: 0,
  volume: 1
};
const fs = require('fs')
bot.login(api_key);

bot.once("ready", () => {
  console.log("connected");
})

const parser = require("discord-command-parser");
const prefix = "&";

bot.on("ready", () => {
  console.log("BrainBot is Online")
})
bot.on("reconnecting", () => {
  console.log("BrainBot is attempting to Reconnect")
})
bot.on('message', async message => {
  if (message.content === '&play') {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();

      // this worked: https://youtu.be/CH50zuS8DD0
      // https://youtu.be/pACxn9n1U4E

      const dispatcher = connection.play(ytdl("https://youtu.be/pACxn9n1U4E"))
				.on('end', reason => {
					if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
					else console.log("Reason: ", reason);
				})
                .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(2 / 5);


      dispatcher.on('start', () => {
        console.log('audio.mp3 is now playing!');
      });

      dispatcher.on('finish', () => {
        console.log('audio.mp3 has finished playing!');
      });



      //   const connection = await message.member.voice.channel.join();
      //   const stream = fs.createReadStream('https://www.youtube.com/watch?v=9fWxCIi5PIw')
      //   connection.playStream(stream)
      //   const dispatcher = connection.playStream(ytdl('https://www.youtube.com/watch?v=9fWxCIi5PIw',{ format: 'audioonly'}))

    } else {
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
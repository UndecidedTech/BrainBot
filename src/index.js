require("dotenv").config();
const discord = require("discord.js");
const bot = new discord.Client()
const api_key = process.env.API_KEY
const ytdl = require('ytdl-core');



bot.login(api_key);

bot.once("ready", () => {
  console.log("connected");
})

//const parser = require("discord-command-parser");
const PREFIX = "&";

bot.on("ready", () => {
  console.log("BrainBot is Online")
})
bot.on("reconnecting", () => {
  console.log("BrainBot is attempting to Reconnect")
})
let musicQueue = [];


bot.on("message", async function(message) { 
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    let args = message.content.substring(PREFIX.length).split(" ");

    const channel = message.member.voice.channel;
    

    switch (args[0].toLowerCase()) {
        case "come":
            summonBot(channel)
            break;
        case "leave":
            message.channel.send("Good bye cruel world").then(channel.leave())
            console.log("Bot has left the channel")
            break;
        case "play":
            let url = args[1];
            if (!url) {
                message.channel.send("Please provide a link")
                return;
            };
            if (!message.member.voice.channel) {
                message.channel.send("You must be in a voice channel")
                return;
            };
            if (!message.guild.voiceConnection) {
                message.member.voice.channel.join().then(async function(connection) {

                musicQueue.push(url);
                await playMusic(connection)

            })};
            break;
        case "add":
            musicQueue.push(args[1]);
            break;
        default:
            message.channel.send("Invalid Command")
            

        
    }

})





function summonBot (channel) {
    channel.join()
    .then(connection => console.log("Connected to Voice Channel"))
    .catch(console.error)
}

async function playMusic (connection) {
  
  const stream = ytdl(musicQueue[0], { filter: 'audioonly'});
  const dispatcher = connection.play(stream);

  dispatcher.on('end', () => {
    musicQueue.shift();

    if(musicQueue.length === 0 ){
      connection.leave();
    }
    else{
      setTimeout(() => {
        playMusic(connection);
      }, 5000);
    }
  });
  
  
  
  
  
  
  
  
  //   dispatcher =  connection.play(ytdl(queue[0], {format: 'audioonly'}));
  //   queue.shift();
  //   dispatcher.on('end', function(){
  //         if(queue[0]) playMusic (connection, queue);
  //         else connection.leave()
  //        })
  //   dispatcher.on('error', error => console.error(error));
  //   dispatcher.setVolumeLogarithmic(2 / 5);

  //   dispatcher.on('start', () => {
  //       console.log('Audio Stream is Now Playing');
  //   });

  //  dispatcher.on('finish', () => {
  //       console.log('Audio Stream has Finished Playing!');
  //   });
    
}







// // bot.on("message",  async (msg) => {
// //     const parsed_msg = parser.parse(msg, prefix);
// //     if (parsed_msg.command === "register") {
// //         msg.channel.send(`SHUT UP ${parsed_msg.arguments[0]}`);

// //     }else if (parsed_msg.command === "come") {
// //         const channel = msg.member.voice.channel;
// //         summonBot(channel)
// //     }else if (parsed_msg.command === "play") {
// //         const channel = msg.member.voice.channel;
// //         playMusic(channel)
// //     }

// })


/*bot.on('message', async message => {
  if (message.content === '&play') {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();

      // this worked: https://youtu.be/CH50zuS8DD0
      // https://youtu.be/pACxn9n1U4E

      const dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=aYekOTLmOLs"))
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
})*/
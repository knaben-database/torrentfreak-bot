require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

const discord = require('discord.js');
const clientBot = new discord.Client();
const PREFIX = "!";
clientBot.commands = new Map();


// Bot is online
clientBot.on('ready', () => {
    console.log("Torrentfreak bot is online! damn!");
});


// Command listener
clientBot.on('message', (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    let cmdArgs = message.content.trim().substring(message.content.trim().indexOf(PREFIX)+1).split(new RegExp((/\s+/)));
    let cmdName = cmdArgs.shift().toLowerCase();

    if (clientBot.commands.get(cmdName)){
        clientBot.commands.get(cmdName).run(discord, clientBot, message, cmdArgs, ESclient);
    }else{
        message.channel.send(`Command **!${cmdName}** not found!`);
    }
})


// Logging in
clientBot.login(process.env.DISCORDJS_BOT_TOKEN);

// timers
require("./timers/checknewlyposted");
var alreadyShown = [];
setTimeout(newPostTimer, 1000*5, discord, clientBot, alreadyShown); // Run imidiently, 5 seconds
setInterval(newPostTimer, 1000*60*30, discord, clientBot, alreadyShown); // 30 minutes loop

// Command handler
// (async function registerCommands(dir = 'commands') {
//     {
//         let files = await fs.readdir(path.join(__dirname, dir));
//
//         for(let file of files){
//             let stat = await fs.lstat(path.join(__dirname, dir, file));
//             if(stat.isDirectory())
//                 registerCommands(path.join(dir, file));
//             else{
//                 if(file.endsWith(".js")){
//                     let cmdName = file.substring(0, file.indexOf(".js"));
//                     let cmdModule = require(path.join(__dirname, dir, file))
//                     clientBot.commands.set(cmdName, cmdModule);
//                 }
//             }
//         }
//
//     }
// })()

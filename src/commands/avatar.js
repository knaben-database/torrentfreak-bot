module.exports.run = async(discord, clientBot, message, args, ESclient) => {
    var avatarURL = "";

    if (args.length === 1){
        var thePossibleUser = args[0].replace(/[^\d.-]/g, '');
        try{
            avatarURL = clientBot.users.resolve(thePossibleUser).displayAvatarURL({dynamic : true});
            avatarURL += "?size=1024";
            message.channel.send(avatarURL);
        }catch (e) {
            console.log(e);
            message.channel.send("User " + args + " not found");
        }
        
    }else if (args.length > 1){
        message.channel.send("Invalid syntax. Use either **!avatar** or **!avatar <user>**");
    }else{
        avatarURL = message.author.displayAvatarURL({dynamic : true});
        avatarURL += "?size=1024";
        message.channel.send(avatarURL);
    }
}
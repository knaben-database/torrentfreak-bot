module.exports.run = async(discord, clientBot, message, args) => {

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        message.channel.send("You cant use this command since you're missing `manage_messages` perm");
        return;
    }
    if (args.length > 1){
        message.channel.send("Too many arguments.. don't you think?");
        return;
    }else if(args.length === 1 && !isNumeric(args[0])){
        message.channel.send("Number please?");
        return;
    }
    let amount = 0;
    if(args.length === 1){
        amount = parseInt(args[0]);
    }else{
        amount = 1;
    }
    if (amount > 100) {
        amount = 100;
    }

    message.channel.bulkDelete(amount + 1).catch(error => message.reply(`Couldn't delete messages because of: ${error}`));


}
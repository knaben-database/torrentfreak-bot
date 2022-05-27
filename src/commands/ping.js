module.exports.run = async(discord, clientBot, message, args, ESclient) => {
    var startPing = message.createdTimestamp;
    var endPing = new Date().getTime();

    msDifference = endPing - startPing;

    message.channel.send(msDifference + " ms ping");
}
newPostTimer = function(discord, clientBot, alreadyShown) {
    let mainServer = clientBot.guilds.cache.get('***REMOVED***');
    let TFChannel = mainServer.channels.cache.get('***REMOVED***');
    const request = require("request");
    const axios = require('axios');
    const cheerio = require('cheerio');

    var Feed = require('rss-to-json');
    // Promise
    Feed.load('https://torrentfreak.com/feed/').then(rss => {
        var rawdata = JSON.stringify(rss, null, 3);
        var jsondata = JSON.parse(rawdata);
        var totalHits = jsondata["items"].length;
        if (totalHits === 0) {
            console.log("No hits for some reason? RSS feed down?");
            return;
        }

        var theItem;

        if (alreadyShown === undefined || alreadyShown.length === 0) {
            // this will only run once to sync up
            console.log("Syncing with the " + totalHits + " latest posts");
            for (var i = 0; i < totalHits; i++) {
                if (!alreadyShown.includes(jsondata["items"][i]["id"])) {
                    alreadyShown.push(jsondata["items"][i]["id"]);
                    console.log("Synced: " + jsondata["items"][i]["id"]);
                }
            }
        } else {
            for (var i = 0; i < totalHits; i++) {
                if (!alreadyShown.includes(jsondata["items"][i]["id"])) {
                    alreadyShown.push(jsondata["items"][i]["id"]);
                    console.log("new post! " + jsondata["items"][i]["id"]);
                    theItem = jsondata["items"][i];
                    console.log(theItem);
                    var theURL = theItem["url"];
                    request({
                        method: 'GET',
                        url: theURL
                    }, (err, res, body) => {

                        if (err) return console.error(err);

                        let $ = cheerio.load(body);

                        let post = {
                            twitter_img: $('meta[name="twitter:image"]').attr('content')
                        }
                        var thaIMG = post['twitter_img'];
                        console.log(thaIMG);

                        var tempDesc = theItem["description"];
                        if (tempDesc.includes("\n")) {
                            tempDesc = tempDesc.split("\n")[0];
                        }

                        $ = cheerio.load(tempDesc);
                        var Thedescription = cheerio.text($('body'));
                        const exampleEmbed = new discord.MessageEmbed()
                            .setColor("#ff4897")
                            .setTitle(theItem["title"])
                            .setURL(theItem["link"])
                            .setDescription(Thedescription)
                            .setImage(thaIMG)
                            .setTimestamp(theItem['published'])
                            .setFooter('Author: ' + theItem['author']);
                        TFChannel.send(exampleEmbed);
                    });
                }
            }
        }
    });
}

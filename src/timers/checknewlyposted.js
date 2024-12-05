newPostTimer = async function(discord, clientBot, alreadyShown) {
    const mainServer = clientBot.guilds.cache.get(process.env.DISCORD_SERVER_ID);
    const TFChannel = mainServer.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
    const axios = require('axios');
    const cheerio = require('cheerio');
    const he = require('he');

    var Feed = require('rss-to-json');

    const rss = await Feed.parse('https://torrentfreak.com/feed/');
    var rawdata = JSON.stringify(rss, null, 3);
    var jsondata = JSON.parse(rawdata);
    const items = jsondata["items"];
    if (items.length === 0) {
        console.log("No hits for some reason? RSS feed down?");
        return;
    }

   if (alreadyShown === undefined || alreadyShown.length === 0) {
       // this will only run once to sync up
       console.log("Syncing with the " + items.length + " latest posts");
       for (var i = 0; i < items.length; i++) {
           if (!alreadyShown.includes(items[i]["id"])) {
               alreadyShown.push(items[i]["id"]);
               console.log("Synced: " + items[i]["id"]);
           }
       }
   } else {
    for (var i = 0; i < items.length; i++) {
        const item = items[i];
        const id = item["id"];
           if (!alreadyShown.includes(id)) {
               alreadyShown.push(id);
               console.log("new post! " + id);
               console.log(item);
               // This must have changed the last 3 years
               // var theURL = item["url"];
               const theURL = id;
               try {
                   const response = await axios.get(theURL);
                   let $ = cheerio.load(response.data);
                   let post = {
                       twitter_img: $('meta[name="twitter:image"]').attr('content')
                   }
                   var thaIMG = post['twitter_img'];
                   console.log(thaIMG);
                   var tempDesc = item["description"];
                   if (tempDesc.includes("\n")) {
                       tempDesc = tempDesc.split("\n")[0];
                   }
                   $ = cheerio.load(tempDesc);
                   var Thedescription = $('body').text();

                   var decodedTitle = he.decode(item["title"]);

                   const exampleEmbed = new discord.MessageEmbed()
                                                   .setColor("#ff4897")
                                                   .setTitle(decodedTitle)
                                                   .setURL(item["link"])
                                                   .setDescription(Thedescription)
                                                   .setImage(thaIMG)
                                                   .setTimestamp(item['published'])
                                                   .setFooter('Author: ' + item['author']);
                   TFChannel.send(exampleEmbed);
               } catch (err) {
                   console.error('Error fetching data:', err);
               }
           }
       }
   }
}

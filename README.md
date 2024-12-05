# Torrentfreak discord bot

Discord bot that automatically posts new articles from torrentfreak.

## Setting up

### Create new Discord bot

1. Go to https://discord.com/developers/applications and create a new application
2. Once created, go to the `bot` section, and generate a token.
3. Create a new file called `.env` at the root of the project, and put the token into it.

```env
DISCORDJS_BOT_TOKEN=<your token here>
```

4. Now add it to your server by going to the installation section.
5. For `Guild Install`, add bot, and send message permission.
6. Copy the install link, and add it to your server.
7. Update the `.env` file, copy discord server ID and channel ID for where to send article updates

```env
DISCORDJS_BOT_TOKEN=<your token here>
DISCORD_SERVER_ID=123456789012345678
DISCORD_CHANNEL_ID=1234567890123456789
```

### Setting up node

Node is required to run this bot. To run it, first do `npm install` in the project root directory, then run it with `node .`

## Wollah

![Bot found 2 new articles in the last 30 minutes](/screenhots/Screenshot_2024-12-05_21:08:58.png)

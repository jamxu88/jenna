# Jenna
![Not my art lol](https://cdn.discordapp.com/attachments/729757758332862535/737422906774126663/03387e22311e8dab20cd3eb23f212283_1.png)
* [Link to artwork](https://www.pinterest.com/pin/629870697860898632/?nic_v1=1a2e%2Bc%2F8ybPI%2B6IHEwuxBwDXGMn2MUvzKt5a6CCAagOFO3Zz%2BgWykMAID0rvU82eo2)
#### The Ultimate Extensive Discord Bot tailored to Self-Botting and Group Chats
* Updated Regularly
* Created by jam#3515 or jamxu88 on github
* Lightweight, easy to host and setup
  * Est. Max Memory usage- 90MiB
  * Idle- 30 MiB
* Made in Discord.js
## Dependencies
* [NodeJS and NPM](https://nodejs.org/en/) (Distrubuted Together)
* `$ npm install discord.js@11.5.1 fetch math.js cheerio request oxford-dictionary-api urban-dictionary pm2`
* [Discord.js](https://www.npmjs.com/package/discord.js) (Version 11.5 or earlier for self-bots, self-bots are depreciated in version 11.6 and later.)
* [Fetch](https://www.npmjs.com/package/fetch)
* [Math.js](https://www.npmjs.com/package/mathjs)
* [Cheerio](https://www.npmjs.com/package/cheerio)
* [Request](https://www.npmjs.com/package/request)
* [Oxford Dictionary API](https://www.npmjs.com/package/oxford-dictionary-api) (Not known to function, used in under development non-functional define command)
* [urban-dictionary](https://www.npmjs.com/package/urban-dictionary)
* Optional: [Git](https://git-scm.com/downloads)- Git makes everything easier to do with their CLI
* Optional: [PM2](https://www.npmjs.com/package/pm2)- Git makes everything easier to do with their CLI
## Features 
* Weather Command (US Zipcodes)
* GC/Server Logging
* Mock Case
* Embeded Messages
* Dice Roll
* Random Number Generator
* Rock, Paper, Scissors
* Magic 8 Ball (Ask Jenna)
* Calculator
* PFP Retrieval
* Some hidden features ;)
* Urban Dictionary Lookup
* Clear Chat
## Under Development/Possible Future Features
* **ETA August Features:**
  * Blacklist
  * Food/Recipe Lookup
    * Nutrition, full recipes
  * Stock market viewer
  * Polling
  * Russian Roulette
* **No ETA Features**
  * Fighting Game
  * Dictionary Command
  * MyAnimeList Search
  * Gify/Tenor GIFs
* **Possible Future Features**
  * Chess
  * Gambling Commands
    * Blackjack
    * Roulette
    * Yahtzee
    * Slots
* **Abandoned Features**
  * Google Search/Image Search
  * GC Music Bot
  * Google Assistant API
## A server only tailored version of Jenna is under development- With all GC features + more
### Beta ETA: 2021 Q1
* This will only be the beta version of Jenna for Servers. It will only have a few basic server-only features upon first release.
### Jenna for servers will also be donation supported and non-open source.
**Server Only Features**:
* Moderation Commands
* Purgatory/Verification Channel/Anti-Bot/Anti-Raid
  * Basic Captcha
  * Application Settings
* Global fighting stats
  * With economy
* [Reddicord](https://github.com/jamxu88/Reddicord)
* Do Not Disturb
* AdminAlert
* Support Ticket System
* Music bot
* Fully customizable
### If you really want to follow Jenna's development, you can view the testnet in this server https://discord.gg/KPaf6en
### Jenna has a 1 man development team. Please be patient with feature releases.
## Known Issues (GC-Bot)
* Bot crashes upon Group Chat name change or picture change (TypeError: channelClass is not a constructor)
* Bot crashes when attempting to send a direct message to non-friend users (DiscordAPIError: Cannot send messages to this user)
* Other misc. self-bot restrictions
* **Bot crash issues can be solved easily through PM2 hosting or self-restarting dynos.**
## Known Server-Only Issues
* None :)
## Self Installation
* First, Download jconfig.json and jenna.js from the [releases page](https://github.com/jamxu88/jenna/releases).
* Next, you need to configure jconfig.json
  * I can't tell you to self-bot... so head over to https://discord.com/developers/ and make a new application and bot
![Discord Developer Portal](https://cdn.discordapp.com/attachments/729757758332862535/737415172259577987/QAAAABJRU5ErkJggg.png)
  * Create a bot ![Bot Creation](https://cdn.discordapp.com/attachments/729757758332862535/737422656046891053/unknown.png)
  * Where it says `token:` in jconfig.js, enter the token within the quotes.
  * Get `dictID` and `dictAppKey` from https://developer.oxforddictionaries.com/
  * `logServerID` should be the channel ID of where you want logged messages to go. To get the channel ID, make sure you're in developer mode ![dev mode](https://cdn.discordapp.com/attachments/729757758332862535/737415741627957306/unknown.png) and right click on the channel and press **Copy ID**
  * `jennaID` should be the Client ID found in your Developer Application ![Dev App](https://cdn.discordapp.com/attachments/729757758332862535/737422836712603698/unknown.png)
* Now you're ready to begin the hosting process. Install the [dependencies](https://github.com/jamxu88/jenna#dependencies).
  * Make sure all dependencies are installed in the same location and cd'd to where jenna.js is located.
* Make sure jenna.js, jconfig.json, and your node modules are in the same folder
* Invite your bot to your server- use https://discordapi.com/permissions.html to generate an invite link.
### Starting and hosting the bot
* **For self hosting:**
* Open a cd to where jenna.js, jconfig.json, and the node modules are located.
* For PM2- `$ pm2 start jenna.js`
* For Stock Node- `$ node jenna.js`
* **Free 24/7 hosting:**
* [Heroku](https://www.heroku.com/) Offers a free 550 hours of hosting per month for your node apps and 1000 hours if you connect a card to your account.
* [Tutorial](https://www.youtube.com/watch?v=24zueyPoHMQ)
* **And you're done!**
#
# Donations are non-refundable, greatly appreciated, and help let this project continue
### BTC: 1NKwF3n4tcyzE5zDhjJSfp13nBN7cHEwsU
### ETH: 0x6727B85FD3978a493BC19EA0a456B3a9Ddc290eF
### DASH: XebAktYUUhf8BzmK5uFDbfQ6nqbeHG3DSz
[![https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=JPF6A3T7URF34&item_name=Buy+me+a+coffee+and+support+the+development+of+Jenna&currency_code=USD&source=url](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)]
### Patreon: Coming Soon (with benifits)

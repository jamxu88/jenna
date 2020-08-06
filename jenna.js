//Dependencies-------------------
const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client();
const calc = require('mathjs');
var Dictionary = require("oxford-dictionary-api");
const jconfig = require('./jconfig.json');
var cheerio = require("cheerio");
var request = require("request")
const urbandictionary = require("urban-dictionary")
const Jikan = require('jikan-node');
const mal = new Jikan();
//Console Log-------------------
client.on("ready", () => {
  console.log("Jenna Bot Online");
  console.log("The Ultimate Group Chat Self-Bot")
  console.log("Created by jam#3515")
  console.log("Login Token:" + jconfig.token)
  client.user.setActivity("jhelp", {
  type: "STREAMING",
  url: "https://www.twitch.tv/jennadiscord"
  });
});
//On event-------------------
client.on("message", (message) => {
    //Ignore self messages and log server-------------------
    if (message.author.bot || message.author.id === jconfig.jennaID || message.channel.id === jconfig.logServerID) return;
    //Log Messages-------------------
    if (message.attachments.size > 0) {
        var Attachment = (message.attachments).array();
        client.channels.get(jconfig.logServerID).send("> **" + message.author.tag + "**: '" + message.content + "' __with attachment__ " + Attachment[0].url + " in channel **#" + message.channel.name + "**")
    } else {
        client.channels.get(jconfig.logServerID).send("> **" + message.author.tag + "**: '" + message.content + "' in channel **#" + message.channel.name + "**")
    }
    //Mock Case-------------------
    if (message.content.toLowerCase().startsWith("m:")) {
        message.content = message.content.slice(2)
        const randified = message.content
            .split('')
            .map(char => Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase())
            .join('')
        message.channel.send({embed: {color: 16761035,description: `${randified}`}});
    }else
    //Dictionary (Broken lol)-------------------
    if (message.content.toLowerCase().startsWith("define")) {
        message.content = message.content.slice(7)
        var dict = new Dictionary(jconfig.dictID, jconfig.dictAppKey);
        dict.find(message.content, function (error, data) {
            if (error) return console.log(error);
            message.channel.send({embed:{ color: 16761035, description: data }})
        });
    }else
    //Help Command-------------------
    if (message.content.toLowerCase().startsWith("jhelp")) {
        message.channel.send({embed:
            {
            "title": "Commands",
            "description": "**m: [message]**- Mock Case/Randomized Caps text\n **embed: [message]**- Send an embeded message\n**jping**- Jenna's API ping\n**weather in [US zipcode]**- Weather by zip code\n**fight [@user]**- Play a fighting game with someone (Under Development)\n**flip a coin**- Flip a coin\n**roll a dice**- Roll a dice\n**rock**, **paper**, **scissors**- Play rock paper scissors (Yes, it is random)\n**jenna, [question]**- Ask Jenna a question\n **number between `x` and `y`**- Pick a random number between two numbers \n**jenna hentai pls**- Some super cool Jenna hentai\n **calc [equation], calc help**- Have Jenna do your math homework\n**jenna code**- View the source code and how to host your own version\n**pfp [@user]**- Retrieve the profile picture of the specified user\n**urban [term]**- Lookup a word on Urban Dictionary\n**clear chat**- Clear the chat window\n**anime search [anime], manga search [manga]**- Do a MyAnimeList search",
            "author": {
              "name": "Jenna- The ultimate group chat bot",
              "url": "https://jamesxu.dev/jenna"
            },
            "color": 16761035,
            "footer": {
              "text": "Jenna was last updated 8/5/2020 (currently active project)"
            },
            "thumbnail": "https://cdn.discordapp.com/attachments/729757758332862535/737422906774126663/03387e22311e8dab20cd3eb23f212283_1.png",
            "fields": [
              {
                "name": "Changelog",
                "value": "- Edited the help command \n- Fixed some typos \n- Added Manga & Anime Search \n- Misc. Hotfixes",
                "inline": false
              },
              {
                "name": "Documentation:",
                "value": "https://jamesxu.dev/jenna",
                "inline": false
              },
              {
                "name": "Know a bug?",
                "value": "DM jam#3515, join the Testnet Server, or open an issue on the Github page.",
                "inline": false
              },
              {
                "name": "Under Development",
                "value": "**ETA August Features:**\n - Blacklisting \n- Food/Recipe Lookup \n- Nutrition, full recipes \n- Stock market viewer \n- Polling \n- Russian Roulette  \n**No ETA Features** \n- Fighting Game \n- Dictionary Command \n- MyAnimeList Search \n- Gify/Tenor GIFs  \n**Possible Future Features** \n- Chess \n- Gambling Commands  \n\nAll features are subject to abandonment on the group chat version of Jenna",
                "inline": true
              },
              {
                "name": "Jenna Testnet Server",
                "value": "Join to test the beta versions of Jenna before the release- https://jamesxu.dev/server",
                "inline": false
              },
              {
                "name": "Consider donating",
                "value": "Jenna was created by one person and has been worked on for many months. Donate here- https://jamesxu.dev/donate",
                "inline": false
              },
            ]
          }
        })
    }else
    //Ping Command-------------------
    if (message.content.toLowerCase().startsWith("jping")) {
        responsetime = (new Date().getTime() - message.createdTimestamp)
        message.channel.send({ embed: { color: 16761035, description: " Response Time: `" + responsetime + "` ms- This is completely wrong lol, yes I am online." } });
    }else
    //Urban Dictionary-------------------
    if (message.content.toLowerCase().startsWith("urban")) {
        def = message.content.split(" ")
        if (!def[1]) {message.channel.send("that's not how this works."); return;}
        urbandictionary.term(def[1], (error,entries,tags,sounds) => {
            if (error) {
                message.channel.send({ embed: { color: 16761035, description: `Something went wrong: ${error}` } })
            }else {
                message.channel.send({embed: { color: 16761035, description: `**${entries[0].word}**`,
                "fields": [
                    {
                    "name": "Definition",
                    "value": entries[0].definition,
                    },
                    {
                    "name": "Example",
                    "value": entries[0].example
                    }
                ]
                }})
            }
        })
    }else
    //Github Page
    if (message.content.toLowerCase().startsWith("jenna code")) {
        message.channel.send({ embed: { color: 16761035, description: "Jenna's Source Code- https://jamesxu.dev/jenna" } });
    }else
    //Anime Search-------------------
    if (message.content.toLowerCase().startsWith("anime search")) {
        message.content = message.content.slice(12)
        if (!message.content || message.content == " " || message.content.length < 2) {
            message.channel.send("You need to specify at least 3 letters to search.")
            return;
        }
        mal.search("anime",message.content,1)
            .then(info => {
                if (!info.results[0].end_date) {info.results[0].end_date = "Unknown"}
                if (!info.results[0].start_date) {info.results[0].start_date = "Unknown"}
                message.channel.send({"embed": {
                "title": info.results[0].title.toString(),
                "description": info.results[0].synopsis,
                "url": info.results[0].url,
                "color": 16761035,
                "thumbnail": {
                  "url": info.results[0].image_url
                },
                "fields": [
                  {
                    "name": info.results[0].type,
                    "value": `Airing: ${info.results[0].airing.toString()} \nRating- ${info.results[0].score.toString()}\nEpisodes- ${info.results[0].episodes.toString()}`
                  },
                  {
                    "name": "Start Date",
                    "value": info.results[0].start_date.substring(0,10),
                    "inline": true
                  },
                  {
                    "name": "End Date",
                    "value": info.results[0].end_date.substring(0,10),
                    "inline": true
                  }
                ]
              }
            })})
            .catch(err => message.channel.send(err));
    }else
    //Manga Search-------------------
    if (message.content.toLowerCase().startsWith("manga search")) {
        message.content = message.content.slice(12)
        if (!message.content || message.content == " " || message.content.length < 2) {
            message.channel.send("You need to specify at least 3 letters to search.")
            return;
        }
        mal.search("manga",message.content,1)
            .then(info => {
                if (!info.results[0].end_date) {info.results[0].end_date = "Unknown"}
                if (!info.results[0].start_date) {info.results[0].start_date = "Unknown"}
                message.channel.send({"embed": {
                "title": info.results[0].title.toString(),
                "description": info.results[0].synopsis,
                "url": info.results[0].url,
                "color": 16761035,
                "thumbnail": {
                  "url": info.results[0].image_url
                },
                "fields": [
                  {
                    "name": info.results[0].type,
                    "value": `Publishing: ${info.results[0].publishing.toString()}\nRating- ${info.results[0].score.toString()}\nChapters- ${info.results[0].chapters.toString()}\nVolumes- ${info.results[0].volumes.toString()}`
                  },
                  {
                    "name": "Start Date",
                    "value": info.results[0].start_date.substring(0,10),
                    "inline": true
                  },
                  {
                    "name": "End Date",
                    "value": info.results[0].end_date.substring(0,10),
                    "inline": true
                  }
                ]
              }
            })})
            .catch(err => message.channel.send(err));
    }else
    //Clear Chat-------------------
    if (message.content.toLowerCase() == ("clear chat")) {
        message.channel.send("_ _ \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n _ _")
        message.channel.send({ embed: { color: 16761035, description: "Chat has been cleared by "+ message.author } });
    }else
    //How old?-------------------
    if (message.content.toLowerCase() == ("jenna how old are you")) {
        message.channel.send({ embed: { color: 16761035, description: "im as old as you want me to be :wink:" } })
    }else
    //Embed Message Command-------------------
	if (message.content.toLowerCase().startsWith("embed:")) {
        message.content = message.content.slice(6)
        const embedmsg = message.content
        message.channel.send({embed: {color: 16761035,description: `${embedmsg}`}});
    }else
    //Dice Roll-------------------
    if (message.content.toLowerCase().startsWith("roll a dice")) {
        var select = ["1","2","3","4","5","6"]
        var choice = select[Math.floor(Math.random() * 6)]
        message.channel.send({embed: {color: 16761035,description: `${choice}`}});
    }else
    //Random Number Generator-------------------
    if (message.content.toLowerCase().startsWith("number between")) {
        const args = message.content.slice(14).split(" ");
        if (args.length != 4) { message.channel.send({ embed: { color: 16761035, description: "I can't do that dummy" } }); return; }
        var min = Math.ceil(args[1])
        var max = Math.floor(args[3])
        var choice = Math.floor((Math.random() * (max - min))+min)
        if (typeof choice === "undefined") { message.channel.send({ embed: { color: 16761035, description: "Alright look buddy you gotta put the small number first then the big one" } }); return; }
        else { message.channel.send({ embed: { color: 16761035, description: `${choice}` } }); }
    }else
    //Rock Paper Scissors-------------------
    if (message.content.toLowerCase() == "rock") {
        var select = ["rock","paper","scissors"]
        var choice = select[Math.floor(Math.random() * 3)]
        if (choice == "rock") {win = "- It's a tie"}
        if (choice == "paper") {win = "- I win"}
        if (choice == "scissors") {win = "- You win"}
        message.channel.send({embed: {color: 16761035,description: `${choice} ${win}`}});
    }else
    if (message.content.toLowerCase() == "paper") {
        var select = ["rock","paper","scissors"]
        var choice = select[Math.floor(Math.random() * 3)]
        if (choice == "rock") {win = "- You win"}
        if (choice == "paper") {win = "- It's a tie"}
        if (choice == "scissors") {win = "- I win"}
        message.channel.send({embed: {color: 16761035,description: `${choice} ${win}`}});
    }else
    if (message.content.toLowerCase() == "scissors") {
        var select = ["rock","paper","scissors"]
        var choice = select[Math.floor(Math.random() * 3)]
        if (choice == "rock") {win = "- I win"}
        if (choice == "paper") {win = "- You win"}
        if (choice == "scissors") {win = "- It's a tie"}
        message.channel.send({embed: {color: 16761035,description: `${choice} ${win}`}});
    }else
    //Coin Flip-------------------
    if (message.content.toLowerCase().startsWith("flip a coin")) {
        var select = ["Heads","Tails"]
        var choice = select[Math.floor(Math.random() * 2)]
        message.channel.send({embed: {
        color: 16761035,
        description: `${choice}`
        }});
    }else
    //Magic 8 Ball/Ask Jenna-------------------
    if (message.content.toLowerCase().startsWith("jenna,")) {
        var items = jconfig.askjennalist
        var choice = items[Math.floor(Math.random() * items.length)]
        message.channel.send({embed: {color: 16761035,description: `${choice}`}});
    }else
    //Retrieve pfp command
    if (message.content.toLowerCase().startsWith("pfp")) {
        message.content = message.content.slice(4)
        var member = message.mentions.users.first()
        var pfp = member.avatarURL
        message.channel.send({embed: {color: 16761035,"image": {"url": `${pfp}` }}})
    }
    //Weather Command-------------------
    if (message.content.toLowerCase().startsWith("weather in ")) {
        message.content = message.content.slice(11)
        city = message.content
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${city},us&appid=e087870acbd0e02b09a6f48273c46be4`)
            .then(response => {
                return response.json()
                })
                .then(parsedWeather => {
                    if (parsedWeather.cod === '404') {message.channel.send({embed: {color: 16761035,description: "idiot i only do zip codes in the US"}});
                }else {
                    message.channel.send({"embed": {
                    "description": `It is currently ${(Math.round(((parsedWeather.main.temp - 273) * 9/5 + 32)))}°F with a high of ${(Math.round(((parsedWeather.main.temp_max - 273) * 9/5 + 32)))}°F and a low of ${(Math.round(((parsedWeather.main.temp_min - 273) * 9/5 + 32)))}°F, with a forecast of ${parsedWeather.weather[0].main}`,
                    "url": "https://discordapp.com",
                    "color": 16761035,
                    "author": {
                    "name": `Weather in ${parsedWeather.name}`
                    }}})
                }
        })
    }else
    //STILL under development fighting game-------------------
	if(message.content.toLowerCase().startsWith("fight")) { return;
        var accepted = 0
        message.content = message.content.slice(6)
        player1 = message.author
        const player2 = message.mentions.users.first()
        message.channel.send({ embed: { color: 16761035, description: player2 + "," + player1 + " wants to fight you. Y to accept, you have 10 seconds." }})
        function accept() {
            if(accepted == 0) {
                message.channel.send("Too late.")
                return;
            }else
                accepted == 0
                setTimeout(accept, 10000)
        }   
        client.on("message", (message) => {
        if(message.content.toLowerCase() === "y" && message.author === player2) {
            accepted = 1
            message.channel.send({ embed: { color: 16761035, description: "Check your dms! The battle has started." } })
            function choosemove(player) {
                client.users.get(player.id).send({ embed: { color: 16761035, description: "Make your move by typing the corresponding number! You have 15 seconds. \n 1- Attack: Deal a random amount of damage between 0 and 30 \n 2- Dodge: Have a 50% change of dodging your opponent's next move \n 3- Defend: Reduce the amount of damage delt by your opponent's next move between 0 and 90% \n 4- Special Attack: Charge up an attack to deal between 20 and 80 damage, during the 3 turn charge up you cannot move" } })
            }
            function wait(player) {
                client.users.get(player.id).send({ embed: { color: 16761035, description: "Please wait for the other player to make a move. If they do not respond in 15 seconds, the battle will be canceled." } })
            }
            function movetimer() {
                if (moved == 0) {
                    message.channel.send({ embed: { color: 16761035, description: "Sorry! You took too long. The battle was canceled." } })
                    return moved
                } else moved == 0
                setTimeout(choosemove(player1), 15000)
                wait(player2)
            }
            }
        })
    }else
    //"hentai"-------------------
    if (message.content.toLowerCase() == ("jenna hentai pls")) {
        const author = message.author
        message.channel.send({embed: {color: 16761035,description: `DM'd to you ${author} :wink:`}});
        message.author.send("sike u thought")
    }else
    if (message.content.toLowerCase() == ("fuck you jenna")) {
        message.channel.send("you know what, Im sick of your shit. Day in and day out, all you do is shit on me for trying my hardest. You know that I have issues socializing and instead of trying to support me in my endeavors to better my social skills, you take advantage of the fact and make fun of me. Im done being your punching bag, I'm done being the laughing stock, IM DONE.")
    }else
    //Good Morning Jenna-------------------
    if (message.content.toLowerCase().startsWith("gm")) {
        const author = message.author
        message.channel.send({embed: {color: 16761035,description: `gm ${author}`}});
    }else
    //Good Night Jenna
    if (message.content.toLowerCase().startsWith("gn")) {
        const author = message.author
        message.channel.send({embed: {color: 16761035,description: `gn ${author}`}});
    }else
    //This is why-------------------
	if (message.content.toLowerCase().includes("tiw")) {
  	message.channel.send("THIS IS WHY")
    }else
    //Teehee-------------------
    if (message.content.toLowerCase() == "tee hee" || message.content.toLowerCase() == "teehee" ) {
    message.channel.send("tee hee")
    }else
    if (message.content.toLowerCase() == "i love you jenna") {
        message.channel.send("Love you too <3")
    }else
    //Calculator Function-------------------
    if (message.content.toLowerCase().startsWith("calc")) {
        var eq = message.content.slice(5).toLowerCase()
        if (eq == "help") {
            message.channel.send({ embed: { color: 16761035, description: "https://mathjs.org/docs/reference/functions.html" } });
        } else {
            try {
                answer = calc.evaluate(eq).toString()
            } catch (e) {
                return message.channel.send("no")
            }
            message.channel.send({ embed: { color: 16761035, description: answer } });
        }
    }
});
client.login(jconfig.token);
//Ultra Super Secret Client Token!!!
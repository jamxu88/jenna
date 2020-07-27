//Dependencies-------------------
const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client();
const calc = require('mathjs');
var Dictionary = require("oxford-dictionary-api");
const jconfig = require('./jconfig.json');
var cheerio = require("cheerio");
var request = require("request")
//Console Log-------------------
client.on("ready", () => {
  console.log("Jenna Bot Online");
  console.log("The Ultimate Group Chat Self-Bot")
  console.log("Created by jam#3515")
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
        message.channel.send({
            "embed": {
                "description": "**Commands**: \n **m:**- Mock Case/Randomized Caps text \n **embed:**- Send an embeded message \n **jping**- Jenna's API ping \n **weather in**- Weather by zip code \n **fight [@user]**- Play a fighting game with someone (under development) \n **flip a coin**- Flip a coin (duh) \n **roll a dice**- Roll a dice \n **rock**, **paper**, **scissors**- Play rock paper scissors (Yes, it is random) \n **jenna,**- Ask Jenna a question \n **number between `x` and `y`**- Pick a random number between two numbers \n **jenna hentai pls**- Some super cool Jenna hentai \n **calc,calc help**- Have Jenna do your math homework \n **img**: Image Search \n **jenna code**: View the source code and how to host your own version!",
                "url": "https://discordapp.com",
                "color": 16761035,
                "thumbnail": {"url": "https://cdn.discordapp.com/attachments/306960397922205696/720838830264942672/2286f2bf03d5ced8a539a5a4ae85aeff.jpg"},
                "author": {"name": "Help- Jenna was last updated on 7/27/2020"}
            }
        });
    }else
    //Image Search Function-----------------
    function imagesearch(message, parts) {
        var search = parts.slice(1).join(" ");
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + search,
            method: "GET",
            headers: {"Accept": "text/html","User-Agent": "Chrome"}
        };
        request(options, function(error, response, responseBody) {
            if (error) {
                message.channel.send({ embed: { color: 16761035, description: "Something went wrong (Google probably knew I was a bot :smile:)" } });
                return;
            }
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
            if (!urls.length) {
                message.channel.send({ embed: { color: 16761035, description: "There were no results." } });
                return;
            }
            message.channel.send(urls[0]);
        });
    }
    if (message.content.toLowerCase().startsWith("img")) {
        message.channel.send({ embed: { color: 16761035, description: "Retrieving Picture... this may take a few seconds." } })
        .then(msg => {
            msg.delete(2500)
          })
          .catch(console.error);
        var parts = message.content.split(" ")
        imagesearch(message, parts);
    }else
    //Ping Command-------------------
    if (message.content.toLowerCase().startsWith("jping")) {
        responsetime = (new Date().getTime() - message.createdTimestamp)
        message.channel.send({ embed: { color: 16761035, description: " Response Time: `" + responsetime + "` ms- This is completely wrong lol, yes I am online." } });
    }else
    //Github Page
    if (message.content.toLowerCase().startsWith("jenna code")) {
        message.channel.send({ embed: { color: 16761035, description: "Jenna's Source Code- https://github.com/jamxu88/jenna" } });
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
    //Calculator Function-------------------
    if (message.content.toLowerCase().startsWith("calc")) {
        var eq = message.content.slice(5).toLowerCase()
        if (eq == "help") {
            message.channel.send({ embed: { color: 16761035, description: "https://mathjs.org/docs/expressions/syntax.html" } });
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
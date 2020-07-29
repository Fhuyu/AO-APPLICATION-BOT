const Discord = require('discord.js')
const bot = new Discord.Client()

const auth = require("./auth")
const token = auth.token

const PREFIX = '!'

bot.on('ready', () => {
    console.log('Bot is online!')
})

bot.on('guildMemberAdd', member => {
    member.guild.channels.cache.get('737744651498291308').send("Welcome");
    // console.log(member)
    member.send(`Welcome to the server ${member.user.username} !
You'll find our rules to the dedicated channel <#737744651498291308>.
Type !apply to start your application`);
});


// bot.on('message', msg => {
//     if(!msg.author.bot) msg.author.send("ok " + msg.author.id)
// })
let currentApplication = {}

bot.on('message', message => {
    // APPLICATIONS --------------
    if(message.content && currentApplication[message.author.id] && currentApplication[message.author.id].applying) {

        if (currentApplication[message.author.id].timer && currentApplication[message.author.id].questionDepth === 7) {
            message.channel.awaitMessages().then(console.log('YAY'))
            // console.log(message)

            if (message.attachments.size > 0) {
                currentApplication[message.author.id].image = message.attachments[0].url
            } else {
                
            }
            
            currentApplication[message.author.id].questionDepth += 1
            currentApplication[message.author.id].application = { embed: {
                color: 3447003,
                // author: {
                //   name: bot.user.username,
                // },
                title: `${message.author.username} Application`,
                // url: "http://google.com",
                // description: "This is a test embed to showcase what they look like and what they can do.",
                fields: [{
                    name: "Name",
                    value: `${currentApplication[message.author.id].name}`
                  },
                  {
                    name: "Average Playtime",
                    value: `${currentApplication[message.author.id].playtime}`
                  },
                  {
                    name: "ZvZ Build",
                    value: `${currentApplication[message.author.id].build}`
                  },
                  {
                    name: "Previous Guilds",
                    value: `${currentApplication[message.author.id].guilds}`
                  },
                  {
                    name: "Expectation of Money Guild",
                    value: `${currentApplication[message.author.id].expectation}`
                  },
                  {
                    name: "English Rating",
                    value: `${currentApplication[message.author.id].english}`
                  },
                  {
                    name: "Timer",
                    value: `${currentApplication[message.author.id].timer}`
                  },
                ],
                timestamp: new Date()
              }
            }
            if(!message.author.bot) {
                message.channel.send(currentApplication[message.author.id].application);
                message.author.send(`Type !confirm to post your application. You can cancel it by typing !cancel`)
            }
        }
        if (currentApplication[message.author.id].english && currentApplication[message.author.id].questionDepth === 6) {
            currentApplication[message.author.id].timer = message.content
            currentApplication[message.author.id].questionDepth += 1
            if(!message.author.bot) message.author.send(`Explain your motivation to join us & post a screenshot of your login page (I want to see your alt's name!)`)
        }
        if (currentApplication[message.author.id].expectation && currentApplication[message.author.id].questionDepth === 5) {
            currentApplication[message.author.id].english = message.content
            currentApplication[message.author.id].questionDepth += 1
            if(!message.author.bot) message.author.send(`When do you normally play? (UTC)`)
        }
        if (currentApplication[message.author.id].guilds && currentApplication[message.author.id].questionDepth === 4) {
            currentApplication[message.author.id].expectation = message.content
            currentApplication[message.author.id].questionDepth += 1
            if(!message.author.bot) message.author.send(`Rate your English (Written & Oral) from 1 to 10`)
        }
        if (currentApplication[message.author.id].build && currentApplication[message.author.id].questionDepth === 3) {
            currentApplication[message.author.id].guilds = message.content
            currentApplication[message.author.id].questionDepth += 1
            if(!message.author.bot) message.author.send(`What are you expecting from us ?`)
        }
        if (currentApplication[message.author.id].playtime && currentApplication[message.author.id].questionDepth === 2) {
            currentApplication[message.author.id].build = message.content
            currentApplication[message.author.id].questionDepth += 1
            if(!message.author.bot) message.author.send(`What's your previous guilds ?`)
        }
        if (currentApplication[message.author.id].name && currentApplication[message.author.id].questionDepth === 1) {
            currentApplication[message.author.id].playtime = message.content
            currentApplication[message.author.id].questionDepth += 1
            if(!message.author.bot) message.author.send(`What's your current ZVZ build/spec ?`)
        }
        if (currentApplication[message.author.id].questionDepth === 0) {
            currentApplication[message.author.id].name = message.content
            currentApplication[message.author.id].questionDepth += 1
            if(!message.author.bot) message.author.send(`What's your average playtime ?`)
        }
        
    }
    // COMMANDS --------------
    let args = message.content.substring(PREFIX.length).split(" ")

    switch(args[0]) {
        case 'ping':
            message.channel.send(exampleEmbed);
            // bot.channels.cache.get('737744651498291308').send('Hello here!') // CHOOSE CHANNEL + NO TAG
            break;
        case 'apply':
            
            currentApplication[message.author.id] = {applying : true, questionDepth: 0}
            // message.channel.send(exampleEmbed);
            bot.channels.cache.get('737744651498291308').send(`New application from ${message.author.username} started`) // CHOOSE CHANNEL + NO TAG
            // bot.channels.cache.get('737744651498291308').send(exampleEmbed) // CHOOSE CHANNEL + NO TAG

            if(!message.author.bot) {
                message.author.send(`Let's go ! Type !cancel to cancel your application.
What's your name in game ?`)

            }

            break;
        case 'confirm':
            if(!message.author.bot) message.author.send(`Your application is posted !`)
            bot.channels.cache.get('737744651498291308').send(currentApplication[message.author.id].application) // CHOOSE CHANNEL + NO TAG
            break;

        case 'cancel':
            currentApplication[message.author.id] = undefined
            message.author.send(`Application canceled. Reapply with !apply whenever you want !`)
            break;
    }
})

bot.login(token)

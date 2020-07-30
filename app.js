const Discord = require('discord.js')
const bot = new Discord.Client()

const auth = require("./auth")
const token = auth.token

const PREFIX = '!'

const helpeEmbed = new Discord.MessageEmbed()
	.setColor('#d67922')
	.setTitle('Application Assistance')
	.setDescription('Find what you need!')
	.setThumbnail('https://cdn.discordapp.com/attachments/322832417578811402/738419667986808942/mglogonew.png')
	.addFields(
		{ name: '!info', value: 'More informations about Money Guild recruitment.'},
		{ name: '!apply', value: 'Begin a new application.' },
		{ name: '!cancel', value: 'Cancel your current application'}, //, inline: true 
		{ name: '!confirm', value: 'Confirm your application. Warning! It will be instantly posted to our private recruitment channel'},
	)

bot.on('ready', () => {
    console.log('Bot is online!')
    bot.channels.cache.get('737024926057365504').send(`Hello, I'm Miya, Money Guild application assistance.
Send me a **private message** to know more about our recruitment (**!info**), and to start your application! (**!apply**)`);
})
//737744651498291308 FUYU
//737024926057365504 MG
bot.on('guildMemberAdd', member => {
    
    member.send(`Welcome to the Money Guild server ${member.user.username} ! <:MG:425692213733752849>
I'm Miya, your application assistance.
You'll find our rules to the dedicated channel <#568971527127826432>. Please read it !
Type **!info** to know how we proceed.
Type **!apply** to start your application`);
});

let currentApplication = {}

bot.on('message', message => {
    const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === message.author.id
    
    // message.awaitReactions(filter, { time: 15000 })
    // .then(collected => console.log(`Collected ${collected.size} reactions`))
    // .catch(console.error);

    // message.channel.send('hello').then(async msg => {
    //     // await msg.react('👌')
    //     msg.awaitReactions(filter, { 
    //         time: 30000,
    //         max:1,
    //         errors: ['time']
    //     })
    //     .then(collected => {
    //         console.log(`Collected ${collected.size} reactions`)
    //         const reaction = collected.first()
    //     })
    //     .catch(console.error);
    // })

    // console.log(message.channel.type)
    if (message.channel.type === 'dm') {
        if (message.content.charAt(0) !== "!" && !message.author.bot) {
            // APPLICATIONS --------------
            if(message.content && currentApplication[message.author.id] && currentApplication[message.author.id].applying) {

                if (currentApplication[message.author.id].timer && currentApplication[message.author.id].questionDepth === 7) {
                    // message.channel.awaitMessages().then(console.log('YAY'))

                    if (message.attachments.size > 0) {
                        currentApplication[message.author.id].image = message.attachments.first().url
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
                            timestamp: new Date(),
                            image: {
                                url: currentApplication[message.author.id].image,
                            },
                        }
                        }
                        if(!message.author.bot) { 
                            message.channel.send(currentApplication[message.author.id].application);
                            message.author.send(`Type **!confirm** to post your application. You can cancel it by typing **!cancel**`)
                        }
                    } else {
                        message.author.send(`Sorry, you didn't send a screenshot !
        Explain your motivation to join us & post a screenshot of your login page (I want to see your alt's name!)`)
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

        }
        // COMMANDS --------------
        let args = message.content.substring(PREFIX.length).split(" ")
        switch(args[0]) {
            case 'apply':
                currentApplication[message.author.id] = {applying : true, questionDepth: 0}
                // message.channel.send(exampleEmbed);
                // console.log(message.author)

                bot.channels.cache.get('737063941791809636').send(`New application from <@${message.author.id}> started`) // 737744651498291308

                if(!message.author.bot) {
                    message.author.send(`Let's go ! You can type **!cancel** to cancel your application.
What's your name in game ?`)
                }
                break;
            case 'confirm':
                // 737744651498291308 Fuyu
                // 737063941791809636 MG
                if (currentApplication[message.author.id].application) {
                    if(!message.author.bot) message.author.send(`**Your application is posted.** Thank you !`)
                    bot.channels.cache.get('737063941791809636').send(`<@${message.author.id}> application done.`)
                    bot.channels.cache.get('737063941791809636').send(currentApplication[message.author.id].application)/* .then(async msg => { 
                            // await msg.react('👌')
                            msg.awaitReactions(filter, { 
                                time: 30000,
                                max:1,
                                errors: ['time']
                            })
                            .then(collected => {
                                console.log(`Collected ${collected.size} reactions`)
                                const reaction = collected.first()
                                console.log(reaction)
                                // message.author.send(`Permission granted!`)
                                message.channel.send('Permission granted!')
                            })
                            .catch(console.error);
                        }) */
                    //  CHOOSE CHANNEL + NO TAG
                } else {
                    if(!message.author.bot) message.author.send(`You can't confirm your application. It's not full !`)
                }
                break;

            case 'cancel':
                currentApplication[message.author.id] = undefined
                message.author.send(`Application canceled. Reapply with **!apply** whenever you want !`)
                break;

            case 'help':
                // currentApplication[message.author.id] = undefined
                if(!message.author.bot) message.author.send(helpeEmbed)
                break;
            case 'info':
                if(!message.author.bot) message.author.send(`The recruitment is divided into three phases :
**1. Post your application**. With my help, we'll build your application, so you don't forget anything!
**2. Interview-accepted Permission granted**. If you fill our requirement, a recruiter will give you this discord permission. A new channel appears! Write your disponibility to get an interview.
**3. Pass the interview**. Don't stress ! It's to make sure you know about our rule, and to discuss with you. When the interview is done, you'll get an invite to the guild! Welcome!
You can apply now with **!apply**.`)
                break;

        }
        let commands = ['apply', 'cancel', 'confirm', 'help', 'info']
        if (!commands.includes(args[0]) && message.content.charAt(0) === '!') {
            if(!message.author.bot) message.author.send(`Sorry, I don't know this command. Type **!help** to see my command list !`)
        }
    }
})

// bot.on('messageReactionAdd', async (reaction, user) => {
//     console.log("Message Reaction Add Top");
//     console.log(reaction)
// })

bot.login(token)

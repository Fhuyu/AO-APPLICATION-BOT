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
Send me a **private message** to know more about our recruitment (**!info**), and to start your application! (**!apply**)
*If you're not looking to apply then ignore this message.*`);
})
//737744651498291308 FUYU
//737024926057365504 MG
bot.on('guildMemberAdd', member => {
    
    member.send(`Welcome to the Money Guild server ${member.user.username} ! 
I'm Miya, your application assistance.
You'll find our rules here <#568971527127826432>.  Please make sure you've read them thoroughly and agree with everything.
Type **!info** to better understand our recruitment process.  Once you've read everything proceed to the next step.
Type !**apply** to begin your application.
*If you're not looking to apply then ignore this message.*`);
});
//<:MG:425692213733752849> EMOTE MG
let currentApplication = {}

bot.on('message', message => {
    /* const guild = bot.guilds.get("737744651498291303");
    let role = guild.roles.find(r => r.name === "Recruiter"); //message.
    console.log(role)
    let recruiters = message.guild.roles.get(role.id).members.map(m=>m.user.tag);
    console.log(recruiters)
    const filter = (reaction) => reaction.emoji.name === '👌' //&& user.id === message.author.id */

    if (message.channel.type === 'dm') {
        if (message.content.charAt(0) !== "!" && !message.author.bot) {
            // APPLICATIONS --------------
            if(message.content && currentApplication[message.author.id] && currentApplication[message.author.id].applying) {

                if (currentApplication[message.author.id].timer && currentApplication[message.author.id].questionDepth === 7) {
                    // message.channel.awaitMessages().then(console.log('YAY'))

                    if (message.attachments.size > 0) {
                        currentApplication[message.author.id].motivation = message.content
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
                                name: "IGN",
                                value: `${currentApplication[message.author.id].name}`
                            },
                            {
                                name: "Average Playtime",
                                value: `${currentApplication[message.author.id].playtime}`
                            },
                            {
                                name: "Timer",
                                value: `${currentApplication[message.author.id].timer}`
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
                                name: "Motivation",
                                value: `${currentApplication[message.author.id].motivation}`
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
                        message.author.send(`Sorry, you didn't send *your motivation with a screenshot*!
Explain your reasons for wanting to join Money Guild **and** please upload a screenshot of your login page (**in the same message**) (no external links)`)
                    }
                    
                }
                if (currentApplication[message.author.id].expectation && currentApplication[message.author.id].questionDepth === 6) {
                    currentApplication[message.author.id].english = message.content
                    currentApplication[message.author.id].questionDepth += 1
                    if(!message.author.bot) message.author.send(`Explain your reasons for wanting to join Money Guild and please upload a screenshot of your login page(no external links)`)
                }
                
                if (currentApplication[message.author.id].guilds && currentApplication[message.author.id].questionDepth === 5) {
                    currentApplication[message.author.id].expectation = message.content
                    currentApplication[message.author.id].questionDepth += 1
                    if(!message.author.bot) message.author.send(`Rate your English (Written & Oral) from 1 to 10`)
                }
                if (currentApplication[message.author.id].build && currentApplication[message.author.id].questionDepth === 4) {
                    currentApplication[message.author.id].guilds = message.content
                    currentApplication[message.author.id].questionDepth += 1
                    if(!message.author.bot) message.author.send(`What are you expecting from us ?`)
                }
                if (currentApplication[message.author.id].timer && currentApplication[message.author.id].questionDepth === 3) {
                    currentApplication[message.author.id].build = message.content
                    currentApplication[message.author.id].questionDepth += 1
                    if(!message.author.bot) message.author.send(`What's your previous guilds ?`)
                }
                if (currentApplication[message.author.id].playtime && currentApplication[message.author.id].questionDepth === 2) {
                    currentApplication[message.author.id].timer = message.content
                    currentApplication[message.author.id].questionDepth += 1
                    if(!message.author.bot) message.author.send(`What's your current ZVZ build/spec ?`)
                }
                if (currentApplication[message.author.id].name && currentApplication[message.author.id].questionDepth === 1) {
                    currentApplication[message.author.id].playtime = message.content
                    currentApplication[message.author.id].questionDepth += 1
                    if(!message.author.bot) message.author.send(`When do you normally play? (UTC)`)
                }
                if (currentApplication[message.author.id].questionDepth === 0) {
                    currentApplication[message.author.id].name = message.content
                    currentApplication[message.author.id].questionDepth += 1
                    if(!message.author.bot) message.author.send(`What's your daily average playtime ?`)
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

                bot.channels.cache.get('737063941791809636').send(`<@${message.author.id}> begins a new application.`)

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
                    // console.log(message.author)
                    bot.channels.cache.get('737063941791809636').send(`<@${message.author.id}> application done.`)
                    // console.log(message.mentions)
                    bot.channels.cache.get('737063941791809636').send(currentApplication[message.author.id].application).then(async msg => { 
                            await msg.react('👍');
                            await msg.react('👎');
                            setTimeout( () => { 
                                msg.awaitReactions(r => ['👍', '👎'].includes(r.emoji.name), {max: 1})
                                .then(collected => {
                                    // console.log(`Collected ${collected} reactions`)
                                    // console.log(`Collected ${collected.size} reactions`)
                                    const reaction = collected.first()
                                    // console.log('reaction ----------------------', reaction, reaction.users.cache)
                                    // console.log(Array.from(reaction.users.cache), '++')

                                    

                                    if (reaction.emoji.name === '👍') {
                                        message.author.send(`Your application is accepted! You need to pass our interview to be recruited. Tag our recruiters in the <#738509633907458129> channel`)
                                        // member.addRole(member.guild.roles.find("name", "Authorize"))
                                        // .then(() => { console.log(`Added ${member.user.username} (${member.id}).`); })
                                        // .catch(console.error);
                                        let guild = reaction.message.channel.guild
                                        
                                        let role = guild.roles.cache.find(r => r.name === "Application Accepted");

                                        let member = guild.members.cache.get(message.author.id)
                                        // console.log(member)
                                        member.roles.add(role)
                                    } else if (reaction.emoji.name === '👎') {
                                        let recruiterInteract = Array.from(reaction.users.cache).find( recruiter => !recruiter[1].bot) //You can contact <@${recruiterInteract.id}>
                                        message.author.send(`Your application was denied. Thank you for your interest in Money Guild! You can contact <@${recruiterInteract[1].id}> for more informations.`)
                                    }
                                })
                                .catch(console.error);
                            }, 3000);
                            
                        })
                    //  CHOOSE CHANNEL + NO TAG
                } else {
                    if(!message.author.bot) message.author.send(`You can't confirm your application. It's not full!`)
                }
                break;

            case 'cancel':
                currentApplication[message.author.id] = undefined
                message.author.send(`Application canceled. Reapply with **!apply** whenever you want!`)
                break;

            case 'help':
                // currentApplication[message.author.id] = undefined
                if(!message.author.bot) message.author.send(helpeEmbed)
                break;
            case 'info':
                if(!message.author.bot) message.author.send(`The recruitment process is dividing into three phases:

1.  **Post your application**.  With my assistance we'll build your application appropriately and make sure that you don't forget anything. (**!apply**)
2.  If we believe that you're a good candidate to join the guild then you will be granted **the 'Interview Accepted' role** on Discord which will grant permissions to a new channel.  Communicate there with our recruiters to proceed to the next step which will be the vocal interview.
3.  And the final step will be hopefully **passing the interview**.  This is to make sure that everybody knows about the rules, to have a discussion about the rules and guild in general while also making sure that you're going to be a good fit personality wise.  The better your English the higher your chances of being accepted.

When the interview is done you'll either be invited to the guild or sent back into the wilderness to find a new home.
`)
                break;

        }
        let commands = ['apply', 'cancel', 'confirm', 'help', 'info']
        if (!commands.includes(args[0]) && message.content.charAt(0) === '!') {
            if(!message.author.bot) message.author.send(`Sorry, I don't know this command. Type **!help** to see my command list!`)
        }
    }
})

// bot.on('messageReactionAdd', async (reaction, user) => {
//     console.log("Message Reaction Add Top");
//     console.log(reaction)
// })

bot.login(token)

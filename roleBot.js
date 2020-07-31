  
const Discord = require('discord.js')
const client = new Discord.Client()

const { token } = require('./config2.json')
const { botID } = require('./config2.json')
const  { prefix } = require('./config2.json')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
    try {
    const validChannel = "role-management"
    const channel = message.channel
    const channelName = message.channel.name
    let userName = message.content.split(" ")
    let roleId = message.content.split(" ")
    let lastUserName = message.content.split(" ")[userName.length -2]
    let lastRoleID = message.content.split(" ")[roleId.length - 1]
    const { id } = message.author

    let roleIdString = lastRoleID.toString().replace(">", "")
    let userNameString = lastUserName.toString().replace("<", "")

    userNameString = userNameString.replace("!", "")
    userNameString = userNameString.replace("<", "")
    userNameString = userNameString.replace(">", "")
    userNameString = userNameString.replace("@", "")
    
    roleIdString = roleIdString.replace("<", "")
    roleIdString = roleIdString.replace("@", "")
    roleIdString = roleIdString.replace("&", "")
    roleIdString = roleIdString.replace(",", "")

    let memberVar = message.guild.members.cache.get(userNameString);
    console.log(memberVar)
    if (channelName === validChannel) {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            if (message.content.startsWith(`${prefix}ar`)) {
                if(memberVar.roles.cache.has(roleIdString)) {
                    channel.send("You already have this role")
                }
                else {
                    memberVar.roles.add(roleIdString)
                        .then(member => message.channel.send("Role Added!"))
                        .catch(err => { 
                        message.channel.send("Something went wrong...");
                        })
                }
            }
            else if (message.content.startsWith(`${prefix}rmr`)) {
                if(!memberVar.roles.cache.has(roleIdString)) {
                    channel.send("Cant remove role, since you dont have the role")
                }    
                else {
                    memberVar.roles.remove(roleIdString)
                        .then(member => message.channel.send("Role Removed"))
                        .catch(err => { 
                            message.channel.send("Something went wrong...")
                        })
                }
            }
        } else {
            channel.send("Invalid permissions!")
       }   }
    }
    catch(err) {
        console.log("Brug")
    }
})  


client.login(token)
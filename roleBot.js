const Discord = require('discord.js')
const client = new Discord.Client()

const { token } = require('../config2.json')
const { botID } = require('../config2.json')
const  { prefix } = require('../config2.json')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
    
    const channel = message.channel
    const userName = message.content.split(" ")[1]
    const roleId = message.content.split(" ").slice(2)
    const { id } = message.author

    let roleIdString = roleId.toString().replace(">", "")
    let userNameString = userName.toString().replace("<", "")

    userNameString = userNameString.replace("<", "")
    userNameString = userNameString.replace(">", "")
    userNameString = userNameString.replace("@", "")
    userNameString = userNameString.replace("!", "")

    roleIdString = roleIdString.replace("<", "")
    roleIdString = roleIdString.replace("@", "")
    roleIdString = roleIdString.replace("&", "")
    roleIdString = roleIdString.replace(",", "")
    
    let memberVar = message.guild.members.cache.get(userNameString);

    if(message.member.hasPermission('ADMINISTRATOR')) {
        if (message.content.startsWith(`${prefix}addRole`)) {
            if(message.member.roles.cache.has(roleIdString)) {
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
        else if (message.content.startsWith(`${prefix}removeRole`)) {
            if(!message.member.roles.cache.has(roleIdString)) {
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
    }
})  

        

    
client.login(token)

/*
if(message.member.roles.cache.has(roleIdString)) {
    message.channel.send("You already have this role!");
    return;
}
*/
/*
            memberVar.roles.add(roleIdString)
            .then(member => message.channel.send("Role Added!"))
            .catch(err => { message.channel.send("Something went wrong...");})
*/

require('dotenv').config()
const {Client, IntentsBitField} = require('discord.js')
const env = process.env

const client = new Client({
intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
]
})

async function dmUser(userID){
    try{
        const user = await client.users.fetch(userID)

        await user.send('Testing DMS')

        
    }catch (error){
        console.error("Error sending DM: ", error)
    }
}

console.log('Bot is running')

client.login(env.DISCORD_TOKEN)

module.exports = {client, dmUser}
require('dotenv').config()
const {Client, IntentsBitField} = require('discord.js')
const env = process.env
const mongoose = require('mongoose');
const Loan = require('./models/loanModel');

const client = new Client({
intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
]
})


console.log('Bot is running')


async function maintain() {
    // await remindAll()  
}

async function remind(loan_id){
    try{
        const loan = await Loan.findById(loan_id)

        for (const borrower of loan.borrowers) {
            const user = await client.users.fetch(borrower.borrower_id);
            await user.send(`This is a reminder you owe ${loan.lender.lender_name} ${borrower.owed} doubloons for ${loan.loan_name}.`)
            await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay
        }
    }catch (error){
        console.error('Error fetching loan:', error);
    }
    

}

async function remindAll() {
    try {
        const loans = await Loan.find(); // Fetch all loans
        
        for (const loan of loans) {
            try{
                for (const borrower of loan.borrowers) {
                    const user = await client.users.fetch(borrower.borrower_id);
                    await user.send(`This is a reminder you owe ${loan.lender.lender_name} ${borrower.owed} doubloons for ${loan.loan_name}.`)
                    await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay
                }
            }catch (error) {
                console.error('Error fetching loans:', error);
            }

        }
    } catch (error) {
        console.error('Error fetching loans:', error);
    }
}

function guildsWithin() {
    return client.guilds.cache.map(guild => ({
        id: guild.id,
        name: guild.name,
        icon: guild.icon, // This is the hash, you may need to construct a full URL
        banner: guild.banner, // Only available for certain servers
        owner: guild.ownerId === client.user.id, // Checks if bot is owner
        permissions: guild.permissions?.bitfield || 0, // Bot permissions in this guild
        permissions_new: guild.permissions?.toString() || '0', // New permissions format
        features: guild.features // List of features enabled on this guild
    }));
}

async function membersInGuild(guildId) {
    try {
        const guild = client.guilds.cache.get(guildId);
        

        const members = await guild.members.fetch();
        const formattedMembers = members.map(member => ({
            id: member.user.id,
            username: member.user.username,
            discriminator: member.user.discriminator,
            avatar: member.user.avatar
        }));

        return(formattedMembers)

    } catch (error) {
        console.error("Error fetching guild members:", error);
        return [];
    }
}



client.login(env.DISCORD_TOKEN)

module.exports = {client, maintain, guildsWithin, membersInGuild}
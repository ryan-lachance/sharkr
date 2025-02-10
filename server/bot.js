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
    await remindAll()  
}

async function remindAll() {
    try {
        const loans = await Loan.find(); // Fetch all loans
        
        for (const loan of loans) {
            try{
                for (const borrower of loan.borrowers) {
                    const user = await client.users.fetch(borrower.borrower_id);
                    await user.send(`This is a reminder you owe ${loan.lender.lender_name} ${borrower.owed} dubloons for ${loan.loan_name}.`)
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


client.login(env.DISCORD_TOKEN)

module.exports = {client, maintain}
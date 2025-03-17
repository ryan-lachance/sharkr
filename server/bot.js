require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const env = process.env;
const mongoose = require("mongoose");
const Loan = require("./models/loanModel");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

console.log("Bot is running");

async function maintain() {
  await remindAll();
}

async function remind(loanId) {
  try {
    const loan = await Loan.findById(loanId);

    for (const borrower of loan.borrowers) {
      const user = await client.users.fetch(borrower.borrowerId);
      await user.send(
        `This is a reminder you owe ${loan.lender.lenderName} ${borrower.owed} doubloons for ${loan.loanName}.`
      );
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s delay
    }
  } catch (error) {
    console.error("Error fetching loan:", error);
  }
}

async function remindAll() {
  try {
    const loans = await Loan.find(); // Fetch all loans

    for (const loan of loans) {
      try {
        for (const borrower of loan.borrowers) {
          const user = await client.users.fetch(borrower.borrowerId);
          await user.send(
            `This is a reminder you owe ${loan.lender.lenderName} ${borrower.owed} doubloons for ${loan.loanName}.`
          );
          await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s delay
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    }
  } catch (error) {
    console.error("Error fetching loans:", error);
  }
}

async function guildsWithin() {
  return Promise.all(
    client.guilds.cache.map(async (guild) => {
      try {
        const fetchedMembers = await guild.members.fetch(); // Fetch all members

        return {
          id: guild.id,
          name: guild.name,
          icon: guild.icon, // This is the hash, you may need to construct a full URL
          banner: guild.banner, // Only available for certain servers
          owner: guild.ownerId === client.user.id, // Checks if bot is owner
          permissions: guild.permissions?.bitfield || 0, // Bot permissions in this guild
          permissions_new: guild.permissions?.toString() || "0", // New permissions format
          features: guild.features, // List of features enabled on this guild
          members: fetchedMembers.map((member) => ({
            id: member.id,
            username: member.user.username,
            discriminator: member.user.discriminator,
            avatar: member.user.avatar,
            bot: member.user.bot,
            roles: member.roles.cache.map((role) => role.name), // List of role names
          })),
        };
      } catch (error) {
        console.error(`Error fetching members for guild ${guild.name}:`, error);
        return null; // Return null or an empty object if fetching fails
      }
    })
  );
}

client.login(env.DISCORD_TOKEN);

module.exports = { client, maintain, guildsWithin, remind };

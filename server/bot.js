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
cacheAllGuildMembers();

async function maintain() {
  await remindAll();
}

// Store the members of all guilds without breaking rate limitss;.
async function cacheAllGuildMembers() {
  // Wait for connection to stabalize
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("Starting full member cache process across all guilds...");

  for (const guild of client.guilds.cache.values()) {
    let success = false;
    let attempts = 0;
    const maxAttempts = 3;

    while (!success && attempts < maxAttempts) {
      attempts++;
      try {
        console.log(
          `[Attempt ${attempts}] Pre-loading cache for: ${guild.name} (${guild.memberCount} members)...`,
        );

        // This fetches everyone and stores them in guild.members.cache
        await guild.members.fetch();

        console.log(`Successfully cached members for ${guild.name}.`);
        success = true;
      } catch (error) {
        if (
          error.name === "GatewayRateLimitError" ||
          error.message?.includes("opcode 8")
        ) {
          const waitTime = error.retryAfter ? error.retryAfter * 1000 : 30000;
          console.warn(
            `Opcode 8 rate-limited on "${guild.name}". Waiting ${(waitTime / 1000).toFixed(1)} seconds...`,
          );
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        } else {
          console.error(`Error caching members for ${guild.name}:`, error);
          break; // Stop retrying on other errors
        }
      }
    }

    // 3-second breathing room buffer between guilds
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  console.log("All guild members have been successfully cached!");
}

async function remind(loanId) {
  try {
    const loan = await Loan.findById(loanId);

    for (const borrower of loan.borrowers) {
      const user = await client.users.fetch(borrower.borrowerId);

      try {
        if (!user.bot) {
          await user.send(
            `This is a reminder you owe ${loan.lender.lenderDisplayName} ${borrower.owed} doubloons for ${loan.loanName}.\n` +
              `If you have paid this loan, or you believe this is a mistake, click here: ${env.CLIENT_URL}/loans/${loan._id}/${borrower.borrowerId}`,
          );
          await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s delay
        }
      } catch (error) {
        console.error("Can't Message:" + user.displayName, error);
      }
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
          if (!user.bot) {
            await user.send(
              `This is a reminder you owe ${loan.lender.lenderDisplayName} ${borrower.owed} doubloons for ${loan.loanName}.\n` +
                `If you have paid this loan, or you believe this is a mistake, click here: ${env.CLIENT_URL}/loans/${loan._id}/${borrower.borrowerId}`,
            );
            await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s delay
          }
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
        const fetchedMembers = await guild.members.cache; // Now uses cache instead of fetching every time.

        return {
          // Potentialy get rid of some of these.
          id: guild.id,
          name: guild.name,
          icon: guild.icon,
          banner: guild.banner,
          owner: guild.ownerId === client.user.id,
          permissions: guild.permissions?.bitfield || 0,
          permissions_new: guild.permissions?.toString() || "0",
          features: guild.features,
          members: fetchedMembers.map((member) => ({
            id: member.id,
            username: member.user.username,
            displayname: member.user.globalName,
            discriminator: member.user.discriminator,
            avatar: member.user.avatar,
            bot: member.user.bot,
            roles: member.roles.cache.map((role) => role.name),
          })),
        };
      } catch (error) {
        console.error(`Error fetching members for guild ${guild.name}:`, error);
        return null;
      }
    }),
  );
}

// Cache's server information when bot joins new server.
client.on("guildCreate", async (guild) => {
  console.log("Joined a new guild: " + guild.name);
  let success = false;
  let attempts = 0;
  const maxAttempts = 3;
  while (!success && attempts < maxAttempts) {
    attempts++;
    try {
      console.log(
        `[Attempt ${attempts}] Pre-loading cache for: ${guild.name} (${guild.memberCount} members)...`,
      );

      // This fetches everyone and stores them in guild.members.cache
      await guild.members.fetch();

      console.log(`Successfully cached members for ${guild.name}.`);
      success = true;
    } catch (error) {
      if (
        error.name === "GatewayRateLimitError" ||
        error.message?.includes("opcode 8")
      ) {
        const waitTime = error.retryAfter ? error.retryAfter * 1000 : 30000;
        console.warn(
          `Opcode 8 rate-limited on "${guild.name}". Waiting ${(waitTime / 1000).toFixed(1)} seconds...`,
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      } else {
        console.error(`Error caching members for ${guild.name}:`, error);
        break; // Stop retrying on other errors
      }
    }
  }
});

client.login(env.DISCORD_TOKEN);

module.exports = { client, maintain, guildsWithin, remind };

require("dotenv").config();
const env = process.env;
const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");

passport.serializeUser((user, done) => {
  done(null, { id: user.id, username: user.username, guilds: user.guilds }); // Store the full profile in session
});

passport.deserializeUser((obj, done) => {
  done(null, obj); // Retrieve the full profile
});

passport.use(
  new DiscordStrategy(
    {
      clientID: env.DISCORD_CLIENT,
      clientSecret: env.DISCORD_SECRET,
      callbackURL: env.DISCORD_REDIRECT,
      scope: ["identify", "guilds"],
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

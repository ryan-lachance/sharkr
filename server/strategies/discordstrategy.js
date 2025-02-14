require('dotenv').config()
const env = process.env
const DiscordStrategy = require('passport-discord').Strategy
const passport = require('passport')

passport.use(new DiscordStrategy({
    clientID: env.DISCORD_CLIENT,
    clientSecret: env.DISCORD_SECRET,
    callbackURL: env.DISCORD_REDIRECT,
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
}))
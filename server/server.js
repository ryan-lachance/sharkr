//Dependencies
require('dotenv').config()
const env = process.env
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const loanRoutes = require('./routes/loans')
const authRoutes = require('./routes/auth')
const guildRoutes = require('./routes/guilds')
const bot = require('./bot')
const cron = require('node-cron')
const session = require('express-session')
const passport = require('passport')
const DiscordStrategy = require('./strategies/discordstrategy')



//express app
const app = express()

//Middleware
app.use(express.json())
app.use(cors({
    origin: env.CLIENT_URL, 
    credentials: true 
}))
app.use(session({ //Add session store
    secret: 'wef233g3gd',
    resave: false,
    cookie: {
        maxAge: 60000 *60 * 24
    },
    saveUninitialized: false
}))



app.use(passport.initialize())
app.use(passport.session())


app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})

//Routes
app.use('/api/loans', loanRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/guilds', guildRoutes)



// connect to db
mongoose.connect(env.MONGO_URI).then(
    () => {app.listen(env.PORT, () =>
        {console.log('Connected to DB and listening on Port 2000!')})}).catch((error => {console.log(error)})
);  


cron.schedule('0 0 * * *', () => {
    bot.maintain()
}, {
    scheduled: true,
    timezone: "America/New_York" 
});
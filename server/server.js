//Dependencies
require('dotenv').config()
const env = process.env
const express = require('express')
const mongoose = require('mongoose')
const loanRoutes = require('./routes/loans')


//express app
const app = express()

//Middleware
app.use(express.json())


app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})

//Routes
app.use('/api/loans', loanRoutes)



// connect to db
mongoose.connect(env.MONGO_URI)
    .then(() => {
        //listner
        app.listen(env.PORT, () =>{
            console.log('Connected to DB and listening on Port 2000!')
        })
    })
    .catch((error => {console.log(error)}))




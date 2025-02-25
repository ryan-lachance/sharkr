const { ReturnDocument } = require('mongodb')
const Loan = require('../models/loanModel')
const mongoose = require('mongoose')
const bot = require('../bot') //Bot commands can be called directly in this script, and will work.


function intersection(botGuilds, userGuilds, key) {
    const set2 = new Set(userGuilds.map(item => item[key])); // Store keys from arr2
    return botGuilds.filter(item => set2.has(item[key]));

}

// get all loans
const getGuilds = async(req,res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" }); // Handle case where user is not authenticated
    }


    let userGuilds = req.user.guilds || []
    let botGuilds = await bot.guildsWithin()
    let intersect = intersection(botGuilds,userGuilds,'id')
    return res.status(200).json(intersect)

    
}



module.exports = {
    getGuilds
}
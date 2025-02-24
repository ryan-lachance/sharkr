const { ReturnDocument } = require('mongodb')
const Loan = require('../models/loanModel')
const mongoose = require('mongoose')
const bot = require('../bot') //Bot commands can be called directly in this script, and will work.


function intersection(arr1, arr2, key) {
    const set2 = new Set(arr2.map(item => item[key])); // Store keys from arr2
    return arr1.filter(item => set2.has(item[key]));
}

// get all loans
const getGuilds = async(req,res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" }); // Handle case where user is not authenticated
    }


    let userGuilds = req.user.guilds || []
    let botGuilds = bot.guildsWithin()
    let intersect = intersection(userGuilds,botGuilds,'id')
    return res.status(200).json(intersect)

    
}

const getGuildMembers = async(req,res) => {
    try{
        const id = req.params.id
        //let members = bot.membersInGuild(id)
        res.status(200).json('members');
    }catch{
        return res.status(404)
    }
}


module.exports = {
    getGuilds,
    getGuildMembers
}
const express = require('express')
const {getGuilds, getGuildMembers} = require('../controllers/guildController')


const router = express.Router()

//Get all guilds
router.get('/', getGuilds)

router.get('/members/:id', getGuildMembers)


module.exports = router
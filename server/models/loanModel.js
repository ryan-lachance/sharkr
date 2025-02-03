const mongoose = require('mongoose')

const Schema = mongoose.Schema
const loanSchema = new Schema({
    name: {type: String, required: true},
    owed: {type: Number, required: true}
}, {timestamps: true})

module.exports = mongoose.model('Loan', loanSchema)



const mongoose = require('mongoose')

// Must rebuild loan model.

const Schema = mongoose.Schema
const loanSchema = new Schema({
    name: {type: String, required: true},
    loaner_id: {type:String, required: true},
    owed: {type: Number, required: true}
}, {timestamps: true})

module.exports = mongoose.model('Loan', loanSchema)



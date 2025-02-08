const mongoose = require('mongoose')

// Must rebuild loan model.

const Schema = mongoose.Schema
const loanSchema = new Schema({
    loan_name: {type: String, required: true},
    lender: {
        lender_id: {type: String, required: true},
        lender_name: {type: String, required: true}
    },
    borrowers: [
        {
            borrower_id: {type: String, required: true},
            borrower_name: {type: String, required: true},
            owed: {type: Number, required: true}
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('Loan', loanSchema)



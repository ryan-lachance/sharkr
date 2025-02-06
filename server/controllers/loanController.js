const { ReturnDocument } = require('mongodb')
const Loan = require('../models/loanModel')
const mongoose = require('mongoose')

// get all loans
const getLoans = async(req,res) => {
    const loans = await Loan.find({}).sort({createdAt: -1})

    res.status(200).json(loans)
}

// get single loan
const getLoan = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such loan'})
    }

    const loan = await Loan.findById(id)


    if (!loan) {
        return res.status(404).json({error: 'No such loan'})
    }

    res.status(200).json(loan)
}

// create new loan
const createLoan = async (req, res) => {
    const {name, loaner_id, owed} = req.body

    // add doc to db
    try {
        const loan = await Loan.create({name, loaner_id, owed})
        res.status(200).json(loan)
    }
    catch (error){
        res.status(400).json({error: error.message})
    }

    
}

// delete a loan
 const deleteLoan = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such loan'})
    }

    const loan = await Loan.findOneAndDelete({_id: id})

    if (!loan) {
        return res.status(400).json({error: 'No such loan'})
    }

    res.status(200).json(loan)

 }

// update a loan
const updateLoan = async (req,res) => {

    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such loan'})
    }

    const loan = await Loan.findOneAndUpdate({_id: id}, {...req.body})

    if (!loan) {
        return res.status(400).json({error: 'No such loan'})
    }

    res.status(200).json(loan)

}


module.exports = {
    getLoans,
    getLoan,
    createLoan,
    deleteLoan,
    updateLoan
}
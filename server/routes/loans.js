const express = require('express')
const {getLoan, getLoans, createLoan, deleteLoan, removeBorrower} = require('../controllers/loanController')

const router = express.Router()

//Get all loans
router.get('/', getLoans)

//Get a specific loan
router.get('/:id', getLoan)

// Add loan
router.post('/', createLoan)

// Delete Loan
router.delete('/:id', deleteLoan)

//Remove a borrower from a loan
router.delete('/:loan_id/borrowers/:borrower_id', removeBorrower)



module.exports = router
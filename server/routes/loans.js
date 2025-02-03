const express = require('express')
const {getLoan, getLoans, createLoan, deleteLoan, updateLoan} = require('../controllers/loanController')

const router = express.Router()

//Get all loans
router.get('/', getLoans)


//Get a specific loan
router.get('/:id', getLoan)

// Add loan
router.post('/', createLoan)

// Delete Loan
router.delete('/:id', deleteLoan)


router.patch('/:id', updateLoan)



module.exports = router
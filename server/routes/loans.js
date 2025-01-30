const express = require('express')
const router = express.Router()

//Get all loans
router.get('/', (req,res) => {
    res.json({mssg: 'get all loans'})
})


//Get a specific loan
router.get('/:id', (req,res) => {
    res.json({mssg: 'get single loan'})
})

// Add loan
router.post('/', (req,res) => {
    res.json({mssg: 'Post a new loan'})
})

// Delete Loan
router.delete('/:id', (req,res) => {
    res.json({mssg: 'Delete a loan'})
})


router.patch('/:id', (req,res) => {
    res.json({mssg: 'Update a loan'})
})



module.exports = router
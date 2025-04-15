const express = require("express");
const {
  getLoan,
  getLoans,
  createLoan,
  deleteLoan,
  updateLoan,
  removeBorrower,
  getUsersLoans,
  remindLoan,
} = require("../controllers/loanController");

const router = express.Router();

/*Get all loans
router.get("/", getLoans);
*/

/*Get a specific loan
router.get("/:id", getLoan);
*/

//Get all loans from specific user
router.get("/users/:id", getUsersLoans);

// Add loan
router.post("/", console.log("testing"));

// Delete Loan
router.delete("/:id", deleteLoan);

// Update Loan

router.patch("/:id", updateLoan);

//Remove a borrower from a loan
router.delete("/:loanId/borrowers/:borrowerId", removeBorrower);

router.patch("/remind/:id", remindLoan);

module.exports = router;

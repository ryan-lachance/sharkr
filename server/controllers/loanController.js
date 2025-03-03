const { ReturnDocument } = require("mongodb");
const Loan = require("../models/loanModel");
const mongoose = require("mongoose");
const bot = require("../bot"); //Bot commands can be called directly in this script, and will work.

// get all loans
const getLoans = async (req, res) => {
  const loans = await Loan.find({}).sort({ createdAt: -1 });

  res.status(200).json(loans);
};

// get single loan
const getLoan = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such loan" });
  }

  const loan = await Loan.findById(id);

  if (!loan) {
    return res.status(404).json({ error: "No such loan" });
  }

  res.status(200).json(loan);
};
const getUsersLoans = async (req, res) => {
  try {
    const { id } = req.params;

    const loans = await Loan.find({ "lender.lenderId": id }).sort({
      createdAt: -1,
    });

    res.status(200).json(loans);
  } catch {
    return res.status(404).json({ error: "No such loan" });
  }
};
// create new loan
const createLoan = async (req, res) => {
  // add doc to db
  try {
    const { loanName, lender, borrowers } = req.body;

    const loan = await Loan.create({ loanName: loanName, lender, borrowers });
    // bot.remind(loan._id) // Needs to be tested
    res.status(200).json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a loan
const deleteLoan = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such loan" });
  }

  const loan = await Loan.findOneAndDelete({ _id: id });

  if (!loan) {
    return res.status(400).json({ error: "No such loan" });
  }

  res.status(200).json(loan);
};

// update a loan
const removeBorrower = async (req, res) => {
  try {
    const { loanId, borrowerId } = req.params;
    const updatedLoan = await Loan.findByIdAndUpdate(
      loanId,
      { $pull: { borrowers: { borrowerId: borrowerId } } },
      { new: true } // Returns the updated document
    );

    if (!updatedLoan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    if (updatedLoan.borrowers.length == 0) {
      const loan = await Loan.findOneAndDelete({ _id: loanId });
      res.status(200).json(loan);
    } else {
      res.json(updatedLoan);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getLoans,
  getLoan,
  createLoan,
  deleteLoan,
  removeBorrower,
  getUsersLoans,
};

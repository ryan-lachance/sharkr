const bot = require("../bot");

let loans = [];
let idCounter = 0;

const getAuthStatus = (req, res, id) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }
  if (req.user.id !== id) {
    return res.status(403).send("Forbidden");
  }
  return null; // Return null if checks pass
};

/* get all loans
const getLoans = async (req, res) => {
  const loans = await Loan.find({}).sort({ createdAt: -1 });

  res.status(200).json(loans);
};
*/

/* get single loan
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
*/

const getUsersLoans = async (req, res) => {
  try {
    const { id } = req.params;

    const authStatus = getAuthStatus(req, res, id);

    if (authStatus) {
      return authStatus;
    }

    const filteredLoans = loans.filter(loan => loan.lender.lenderId === id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json(filteredLoans);
  } catch {
    return res.status(404).json({ error: "No such loan" });
  }
};
// create new loan
const createLoan = async (req, res) => {
  // add doc to db
  try {
    const { loanName, guild, lender, borrowers } = req.body;
    const authStatus = getAuthStatus(req, res, lender.lenderId);

    if (authStatus) {
      return authStatus;
    }

    const loan = {
      _id: ++idCounter,
      loanName,
      guild,
      lender,
      borrowers,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    loans.push(loan);

    res.status(200).json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateLoan = async (req, res) => {
  try {
    const { loanName, guild, lender, borrowers } = req.body;
    const { id } = req.params; // Get loan ID from request params

    const authStatus = getAuthStatus(req, res, lender.lenderId);

    if (authStatus) {
      return authStatus;
    }

    const loanIndex = loans.findIndex(loan => loan._id == id);
    if (loanIndex === -1) {
      return res.status(404).json({ error: "Loan not found" });
    }
    loans[loanIndex] = {
      ...loans[loanIndex],
      loanName,
      guild,
      lender,
      borrowers,
      updatedAt: new Date()
    };
    res.status(200).json(loans[loanIndex]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a loan
const deleteLoan = async (req, res) => {
  const { id } = req.params;

  const loanIndex = loans.findIndex(loan => loan._id == id);
  if (loanIndex === -1) {
    return res.status(404).json({ error: "No such loan" });
  }

  const loan = loans[loanIndex];

  const authStatus = getAuthStatus(req, res, loan.lender.lenderId);

  if (authStatus) {
    return authStatus;
  }
  loans.splice(loanIndex, 1);

  res.status(200).json(loan);
};

// update a loan
const removeBorrower = async (req, res) => {
  try {
    const { loanId, borrowerId } = req.params;

    const loanIndex = loans.findIndex(loan => loan._id == loanId);
    if (loanIndex === -1) {
      return res.status(404).json({ error: "Loan not found" });
    }
    const updatedBorrowers = loans[loanIndex].borrowers.filter(b => b.borrowerId !== borrowerId);
    loans[loanIndex].borrowers = updatedBorrowers;
    loans[loanIndex].updatedAt = new Date();
    if (updatedBorrowers.length === 0) {
      const deletedLoan = loans.splice(loanIndex, 1)[0];
      res.status(200).json(deletedLoan);
    } else {
      res.json(loans[loanIndex]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const remindLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = loans.find(loan => loan._id == id);

    const authStatus = getAuthStatus(req, res, loan ? loan.lender.lenderId : null);
    if (authStatus) {
      return authStatus;
    }

    bot.remind(id);
    res.status(200).json({ message: "status OK" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  //getLoans,
  //getLoan,
  createLoan,
  deleteLoan,
  updateLoan,
  removeBorrower,
  getUsersLoans,
  remindLoan,
};

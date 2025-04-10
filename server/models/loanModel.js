const mongoose = require("mongoose");

// Must rebuild loan model.

const Schema = mongoose.Schema;
const loanSchema = new Schema(
  {
    loanName: { type: String, required: true },
    guild: {
      guildId: { type: String, require: true },
      guildName: { type: String, require: true },
    },
    lender: {
      lenderId: { type: String, required: true },
      lenderName: { type: String, required: true },
      lenderDisplayName: { type: String, required: false },
    },
    borrowers: [
      {
        borrowerId: { type: String, required: true },
        borrowerName: { type: String, required: true },
        borrowerDisplayName: { type: String, required: false },
        owed: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema);

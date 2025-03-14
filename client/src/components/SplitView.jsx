import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  ListItemAvatar,
  Avatar,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

function SplitView({ guilds, loans, Loan, deleteLoan, updateLoan, openPopUp }) {
  const [selectedLoan, setSelectedLoan] = useState("");

  const handleLoanChange = (event) => {
    const loan = loans.find((l) => l._id === event.target.value); // Find full loan object
    setSelectedLoan(loan);
  };

  function addBorrower() {}

  const removeBorrower = (id) => {
    setSelectedLoan((prevLoan) => ({
      ...prevLoan,
      borrowers: prevLoan.borrowers.filter((b) => b.borrowerId !== id),
    }));
  };

  function renameLoan(newName) {
    setSelectedLoan((prevLoan) => ({
      ...prevLoan,
      loanName: newName,
    }));
  }

  function setOwed(value, borrowerId) {
    setSelectedLoan((prevLoan) => ({
      ...prevLoan,
      borrowers: prevLoan.borrowers.map((b) =>
        b.borrowerId === borrowerId ? { ...b, owed: value } : b
      ),
    }));
  }

  return (
    <Paper
      sx={{
        width: 600,
        height: 400,
        display: "flex",
        mx: "auto",
        mt: 5,
        overflow: "hidden",
      }}
    >
      {/* Left Section - Loan Selector */}
      <Box
        sx={{
          width: "30%",
          bgcolor: "grey.200",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormControl sx={{ maxHeight: 200, overflow: "auto" }}>
          <FormLabel>Loans</FormLabel>
          <RadioGroup
            value={selectedLoan?._id || ""}
            onChange={handleLoanChange}
          >
            {loans.map((loan) => (
              <FormControlLabel
                key={loan._id}
                value={loan._id}
                control={<Radio />}
                label={loan.loanName}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          sx={{ mt: "auto" }}
          onClick={() => openPopUp()}
        >
          New Loan
        </Button>
      </Box>

      {/* Right Section - Content */}
      {selectedLoan && (
        <Box sx={{ width: "70%", p: 3 }} key={selectedLoan._id}>
          <TextField
            label="Loan Name"
            defaultValue={selectedLoan.loanName}
            onChange={(e) => renameLoan(e.target.value)}
          />
          <Typography>Server: {selectedLoan.guild.guildName}</Typography>
          {selectedLoan.borrowers.map((borrower) => (
            <Box
              key={borrower.borrowerId}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Typography>{borrower.borrowerName}</Typography>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => removeBorrower(borrower.borrowerId)}
              >
                X
              </Button>
              <TextField
                label="Amount"
                type="number"
                defaultValue={borrower.owed}
                onChange={(e) => setOwed(e.target.value, borrower.borrowerId)}
              />
            </Box>
          ))}
          <Button
            variant="contained"
            sx={{ mt: "auto" }}
            onClick={() => updateLoan(selectedLoan)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            sx={{ mt: "auto", bgcolor: "DarkRed" }}
            onClick={() => deleteLoan(selectedLoan._id)}
          >
            Delete
          </Button>
          <Button variant="contained" sx={{ mt: "auto" }}>
            Remind All
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default SplitView;

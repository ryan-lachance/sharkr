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
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";

function SplitView({
  guilds,
  loans,
  Loan,
  deleteLoan,
  updateLoan,
  openPopUp,
  remindLoan,
}) {
  const [selectedLoan, setSelectedLoan] = useState("");
  const [selectedGuild, setSelectedGuild] = useState("");

  const handleLoanChange = (event) => {
    const loan = loans.find((l) => l._id === event.target.value); // Find full loan object
    setSelectedLoan(loan);
    let loanGuid = guilds.find(
      (loanGuild) => loanGuild.id == loan.guild.guildId
    );
    setSelectedGuild(loanGuid);
  };

  function addBorrower(user) {
    let borrowerExists = false;

    for (const borrower of selectedLoan.borrowers) {
      if (borrower.borrowerId == user.id) {
        borrowerExists = true;
      }
    }

    if (user != null && !borrowerExists) {
      setSelectedLoan((prevLoan) => ({
        ...prevLoan, // Copy existing loan properties
        borrowers: [
          ...prevLoan.borrowers, // Copy existing borrowers
          {
            borrowerId: user.id,
            borrowerName: user.username,
            owed: 0,
          },
        ],
      }));
      console.log(selectedLoan);
    }
  }

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
        width: "40vw",
        height: "80vh",
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
          bgcolor: "#0b2a41",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormLabel>Loans</FormLabel>
        <FormControl sx={{ maxHeight: 200, overflow: "auto" }}>
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
        <Box sx={{ width: "70%", height: "100%", p: 2 }} key={selectedLoan._id}>
          <FormLabel>Loan Information</FormLabel>
          <Box
            sx={{ display: "flex", height: "100%", flexDirection: "column" }}
          >
            <Typography sx={{ paddingBottom: 1 }}>
              Server: {selectedLoan.guild.guildName}
            </Typography>
            <TextField
              label="Loan Name"
              defaultValue={selectedLoan.loanName}
              onChange={(e) => renameLoan(e.target.value)}
              sx={{}}
            />
            <Autocomplete
              disablePortal
              options={selectedGuild.members}
              value={null}
              getOptionLabel={(option) => option?.username || "Unknown User"}
              onChange={(event, newValue) => {
                addBorrower(newValue);
              }}
              sx={{ paddingTop: 1, paddingBottom: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Add Borrower" />
              )}
            />
            <Box sx={{ overflow: "auto", flexGrow: 1 }}>
              {selectedLoan.borrowers.map((borrower) => (
                <Box
                  key={borrower.borrowerId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    padding: 0.5,
                  }}
                >
                  <Typography sx={{ width: 150 }}>
                    {borrower.borrowerName}
                  </Typography>
                  <TextField
                    label="Amount"
                    type="number"
                    defaultValue={borrower.owed}
                    onChange={(e) =>
                      setOwed(e.target.value, borrower.borrowerId)
                    }
                  />
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => removeBorrower(borrower.borrowerId)}
                  >
                    X
                  </Button>
                </Box>
              ))}
            </Box>
            <Box sx={{ paddingBottom: 2, paddingTop: 2 }}>
              <Button
                variant="contained"
                sx={{ mt: "auto", width: "20%" }}
                onClick={() => updateLoan(selectedLoan)}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{
                  mt: "auto",
                  marginRight: 0.5,
                  marginLeft: 0.5,
                  width: "20%",
                }}
                onClick={() => deleteLoan(selectedLoan._id)}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                sx={{ mt: "auto", width: "20%" }}
                onClick={() => remindLoan(selectedLoan)}
              >
                Remind All
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  );
}

export default SplitView;

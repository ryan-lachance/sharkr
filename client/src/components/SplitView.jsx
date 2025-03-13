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

function SplitView({ guilds, loans, Loan, deleteLoan, openPopUp }) {
  const [setLoading, loading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState("");

  const handleLoanChange = (event) => {
    const loan = loans.find((l) => l._id === event.target.value); // Find full loan object
    setSelectedLoan(loan);
  };
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
          <TextField label="Loan Name" defaultValue={selectedLoan.loanName} />
          <Typography>Server: {selectedLoan.guild.guildName}</Typography>
          {selectedLoan.borrowers.map((borrower) => (
            <Typography key={borrower.borrowerId}>
              {borrower.borrowerName}
            </Typography>
          ))}
          <Button variant="contained" sx={{ mt: "auto" }}>
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

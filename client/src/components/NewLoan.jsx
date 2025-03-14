// PopupDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";

const NewLoan = ({ open, onClose, guilds, userSession, createLoan }) => {
  const API = import.meta.env.VITE_API_PATH;
  const [loanName, setLoanName] = useState("");
  const [guild, setGuild] = useState(null);
  const [error, setError] = useState(false);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Loan</DialogTitle>
      <DialogContent>
        <p>This is the content of the popup!</p>
        <TextField
          label="Loan Name"
          value={loanName}
          onChange={(event) => setLoanName(event.target.value)}
          error={error && loanName === ""}
          helperText={error && loanName === "" ? "This field is required" : ""}
        />
        <Autocomplete
          disablePortal
          options={guilds}
          getOptionLabel={(option) => option?.name || "Unknown Guild"}
          value={guild} // Make sure `guild` is an object, not a string
          onChange={(event, newValue) => setGuild(newValue)}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Server"
              error={error && !guild}
              helperText={error && !guild ? "Please select a server" : ""}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (loanName == "".trim() || !guild) {
              setError(true);
            } else {
              setError(false);
              createLoan(loanName, guild); // Call your function
            }
          }}
          color="primary"
        >
          Create Loan
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewLoan;

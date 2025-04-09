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
  const [newLoanName, setNewLoanName] = useState("");
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [error, setError] = useState(false);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Loan</DialogTitle>
      <DialogContent>
        <p>Create a new loan</p>
        <TextField
          label="Loan Name"
          value={newLoanName}
          onChange={(event) => setNewLoanName(event.target.value)}
          error={error && newLoanName === ""}
          helperText={
            error && newLoanName === "" ? "This field is required" : ""
          }
          sx={{ width: 250, paddingBottom: 1 }}
        />
        <Autocomplete
          disablePortal
          options={guilds}
          getOptionLabel={(option) => option?.name || "Unknown Guild"}
          value={selectedGuild} // Make sure `guild` is an object, not a string
          onChange={(event, newValue) => setSelectedGuild(newValue)}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Server"
              error={error && !selectedGuild}
              helperText={
                error && !selectedGuild ? "Please select a server" : ""
              }
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (newLoanName == "".trim() || !selectedGuild) {
              setError(true);
            } else {
              setError(false);
              createLoan(newLoanName, selectedGuild); // Call your function
            }
          }}
          color="primary"
        >
          Create Loan
        </Button>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewLoan;

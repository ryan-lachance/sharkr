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

const NewLoan = ({ open, onClose, guilds, userSession }) => {
  const API = import.meta.env.VITE_API_PATH;
  const [loanName, setLoanName] = useState("");
  const [guild, setGuild] = useState(null);
  const [error, setError] = useState(false);

  console.log("Guilds Data:", guilds);
  function createLoan() {
    if (loanName != "".trim() && guild != null) {
      fetch(`${API}/loans`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // Ensure the server knows it's JSON
        },
        body: JSON.stringify({
          loanName: loanName, // Example data, replace with real input
          guild: {
            guildId: guild.id,
            guildName: guild.name,
          },
          lender: {
            lenderId: userSession.user.id,
            lenderName: userSession.user.username,
          },
          borrowers: [],
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to create loan");
          return response.json();
        })
        .catch((error) => console.error("Error:", error));
      window.location.reload();
    }
  }

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
              createLoan(); // Call your function
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

// PopupDialog.jsx
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const NewLoan = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Loan</DialogTitle>
      <DialogContent>
        <p>This is the content of the popup!</p>
        <p>Loan Name</p>
        <p>Loan Server</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
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

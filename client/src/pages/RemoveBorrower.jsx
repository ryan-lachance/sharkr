import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";

function RemoveBorrowerPage() {
  const { loanId, borrowerId } = useParams();
  const [text, setText] = useState(
    "If you have paid this loan, or you believe you were messaged by mistake, click below."
  );
  const [deleted, setDeleted] = useState(false);
  console.log(loanId);
  console.log(borrowerId);
  const API = import.meta.env.VITE_API_PATH;

  function removeBorrower() {
    setText("Removing you from the loan...");
    fetch(`${API}/loans/${loanId}/borrowers/${borrowerId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setText("You have been removed from the loan!");
        } else {
          setText("We were unable to remove you from the loan.");
        }
      })
      .catch((error) => console.error("Error:", error));

    setDeleted(true);
  }

  return (
    <>
      <Typography>{text}</Typography>
      {!deleted ? (
        <Button sx={{ margin: 1 }} onClick={removeBorrower}>
          Remove Self From Loan
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}

export default RemoveBorrowerPage;

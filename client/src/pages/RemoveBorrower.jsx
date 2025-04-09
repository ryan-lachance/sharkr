import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

function RemoveBorrowerPage() {
  const { loanId, borrowerId } = useParams();
  const [text, setText] = useState("Removing you from the loan...");
  console.log(loanId);
  console.log(borrowerId);
  const API = import.meta.env.VITE_API_PATH;

  useEffect(() => {
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
  }, [loanId, borrowerId]);

  return <Typography>{text}</Typography>;
}

export default RemoveBorrowerPage;

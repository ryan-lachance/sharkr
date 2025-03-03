import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { useEffect } from "react";

function RemoveBorrowerPage() {
  const { loanID, borrowerId } = useParams();
  const API = import.meta.env.VITE_API_PATH;

  useEffect(() => {
    fetch(`${API}/loans/${loanID}/borrowers/${borrowerId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }, [loanID, borrowerId]);

  return <p>Removing borrower...</p>;
}

export default RemoveBorrowerPage;

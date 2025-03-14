import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

//component
import SplitView from "../components/SplitView";
import { default as PopUp } from "../components/NewLoan";

function Dashboard() {
  const API = import.meta.env.VITE_API_PATH;
  const [userSession, setUserSession] = useState({
    isAuthenticated: false,
    user: { id: null },
  });
  const [guilds, setGuilds] = useState([]);
  //need a guild members prop?
  const [loans, setLoans] = useState([]); //Get all loans of the current user.
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function authUser() {
    fetch(`${API}/auth/status`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserSession(data);
      })
      .catch((error) => console.error("Error:", error));
  }

  function getGuilds() {
    fetch(`${API}/guilds`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setGuilds(data);
      })
      .catch((error) => console.error("Error:", error));
  }

  function getUserLoans() {
    fetch(`${API}/loans/users/${userSession.user.id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoans(data);
      })
      .catch((error) => console.error("Error:", error));
  }
  function deleteLoan(loanId) {
    fetch(`${API}/loans/${loanId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete");
        }
        return response.json();
      })
      .then((data) => console.log("Deleted successfully:", data))
      .catch((error) => console.error("Error:", error));
    window.location.reload();
  }

  function createLoan(loanName, guild) {
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

  function updateLoan(loan) {
    fetch(`${API}/loans/${loan._id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Ensure the server knows it's JSON
      },
      body: JSON.stringify({
        loanName: loan.loanName, // Example data, replace with real input
        guild: loan.guild,
        lender: loan.lender,
        borrowers: loan.borrowers,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update loan");
        return response.json();
      })
      .catch((error) => console.error("Error:", error));
    window.location.reload();
  }

  useEffect(() => {
    authUser();
    getGuilds();
  }, []);

  useEffect(() => {
    if (userSession.isAuthenticated) {
      getUserLoans();
    }
  }, [userSession]);

  return (
    <Container>
      <SplitView
        guilds={guilds}
        loans={loans}
        deleteLoan={deleteLoan}
        updateLoan={updateLoan}
        openPopUp={handleClickOpen}
      />
      <PopUp
        open={open}
        onClose={handleClose}
        guilds={guilds}
        userSession={userSession}
        createLoan={createLoan}
      />
    </Container>
  );
}

export default Dashboard;

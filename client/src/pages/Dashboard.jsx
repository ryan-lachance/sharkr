import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

//component
import SplitView from "../components/SplitView";
import NavBar from "../components/NavBar";
import { default as PopUp } from "../components/NewLoan";

function Dashboard() {
  const API = import.meta.env.VITE_API_PATH;
  const [userSession, setUserSession] = useState({
    isAuthenticated: false,
    user: { id: null },
  });
  const [guilds, setGuilds] = useState([]);
  const [loans, setLoans] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      .then((data) => {
        console.log("Deleted successfully:", data);
        window.location.reload();
      })
      .catch((error) => console.error("Error:", error));
  }

  function createLoan(loanName, guild) {
    if (loanName != "".trim() && guild != null) {
      fetch(`${API}/loans`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          loanName: loanName, 
          guild: {
            guildId: guild.id,
            guildName: guild.name,
          },
          lender: {
            lenderId: userSession.user.id,
            lenderName: userSession.user.username,
            lenderDisplayName: userSession.user.displayname,
          },
          borrowers: [],
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to create loan");
          return response.json();
        })
        .then((data) => {
          window.location.reload();
        })
        .catch((error) => console.error("Error:", error));
    }
  }

  function updateLoan(loan) {
    fetch(`${API}/loans/${loan._id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loanName: loan.loanName, 
        guild: loan.guild,
        lender: loan.lender,
        borrowers: loan.borrowers,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update loan");
        window.location.reload();
      })
      .catch((error) => console.error("Error:", error));
  }

  function remindLoan(loan) {
    fetch(`${API}/loans/remind/${loan._id}`, {
      method: "PATCH",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remind loan");
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    authUser();
  }, []);

  useEffect(() => {
    if (userSession.isAuthenticated) {
      getUserLoans();
      getGuilds();
    }
    console.log(userSession);
  }, [userSession]);

  useEffect(() => {
    if (guilds.length > 0) {
      setLoading(false);
    }
  }, [guilds]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  function logout() {
    window.location.href = `${API}/auth/logout`;
  }

  return (
    <Container>
      <NavBar userSession={userSession} logout={logout} login={null} />

      <SplitView
        guilds={guilds}
        loans={loans}
        deleteLoan={deleteLoan}
        updateLoan={updateLoan}
        openPopUp={handleClickOpen}
        remindLoan={remindLoan}
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

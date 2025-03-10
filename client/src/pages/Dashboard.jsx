import { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";

//component
import SplitView from "../components/SplitView";

function Dashboard() {
  const API = import.meta.env.VITE_API_PATH;
  const [userSession, setUserSession] = useState({
    isAuthenticated: false,
    user: { id: null },
  });
  const [guilds, setGuilds] = useState([]);
  //need a guild members prop?
  const [loans, setLoans] = useState([]); //Get all loans of the current user.
  const [popUp, setPopUp] = useState(false);

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
        setPopUp={setPopUp}
      />
      {popUp && <p>test</p>}
    </Container>
  );
}

export default Dashboard;

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
  const [loans, setLoans] = useState([]); //Get all loans of the current user.

  function authUser() {
    fetch(`${API}/auth/status`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserSession(data);
        console.log(data);
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
        console.log(data);
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
      <Typography>This is the dashboard</Typography>
      <SplitView guilds={guilds} loans={loans} />
    </Container>
  );
}

export default Dashboard;

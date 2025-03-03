import { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";

//component
import SplitView from "../components/SplitView";

function Dashboard() {
  const API = import.meta.env.VITE_API_PATH;
  const [userSession, setUserSession] = useState({ isAuthenticated: false });
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
    //Get all loans of the current user
  }

  useEffect(() => {
    authUser();
    getGuilds();
  }, []);

  return (
    <Container>
      <Typography>This is the dashboard</Typography>
      <SplitView guilds={guilds} />
    </Container>
  );
}

export default Dashboard;

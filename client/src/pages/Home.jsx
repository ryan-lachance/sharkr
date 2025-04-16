import { useEffect, useState } from "react";
import { Container, Box, Typography, Button, Paper } from "@mui/material";

//component
import NavBar from "../components/NavBar";

function Home() {
  const API = import.meta.env.VITE_API_PATH;
  let userSession = { isAuthenticated: false };

  useEffect(() => {
    fetch(`${API}/auth/status`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        userSession = data;
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  function login() {
    window.location.href = `${API}/auth`;
  }

  function logout() {
    window.location.href = `${API}/auth/logout`;
  }

  function inviteBot() {
    window.location.href = import.meta.env.VITE_BOT_ADD_PATH;
  }

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <NavBar userSession={userSession} logout={logout} login={login} />
      <Typography variant="h4" sx={{ paddingBottom: 2 }}>
        Don't shake down your friends for money...
      </Typography>
      <img src="shark.png" />
      <Typography variant="h5" marginBottom={1}>
        ...Let Sharkr do it for you!
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "200px",
        }}
      >
        <Box>
          <Typography>
            Sharkr is a Discord Bot to help you split costs between friends,
            like booking an escape room or hotel.
          </Typography>
          <Typography>
            Invite Sharkr to your server, create a loan with our slick web
            interface, and let Sharkr remind your friends to pay you back.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <Button sx={{ marginRight: 0.5 }} onClick={login}>
              Login to the Dashboard
            </Button>
            <Button
              sx={{
                marginLeft: 0.5,
              }}
              onClick={inviteBot}
            >
              Invite Sharkr to your Server
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;

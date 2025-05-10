import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button, Paper, Link } from "@mui/material";

//component
import NavBar from "../components/NavBar";

function Home() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_PATH;
  const [userSession, setUserSession] = useState({ isAuthenticated: false });

  useEffect(() => {
    fetch(`${API}/auth/status`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserSession(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  function login() {
    if (userSession.isAuthenticated) {
      navigate("/dashboard");
    } else {
      window.open(`${API}/auth`, "_blank");
    }
  }

  function logout() {
    window.location.href = `${API}/auth/logout`;
  }

  function inviteBot() {
    window.open(
      "https://discord.com/oauth2/authorize?client_id=1329857247873863792&permissions=0&integration_type=0&scope=bot",
      "_blank"
    );
  }

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <NavBar userSession={userSession} logout={logout} login={login} />
      <Typography variant="h4" sx={{ paddingBottom: 2 }}>
        Don't shake down your friends for money...
      </Typography>
      <img src="logo.png" style={{ maxWidth: "50%" }} />
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
        <Link href="https://github.com/ryan-lachance/sharkr/blob/release/README.md">
          <Typography
            variant="subtitle1"
            sx={{ marginTop: 4, color: "lightgray" }}
          >
            Important note for IOS users
          </Typography>
        </Link>
        <Link href="https://linktr.ee/shreybae">
          <Typography
            variant="subtitle2"
            sx={{ marginTop: 4, color: "lightgray" }}
          >
            Logo courtesy of Shreya Langhe
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Home;

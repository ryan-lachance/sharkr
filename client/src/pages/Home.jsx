import { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";

//component

function Home() {
  const API = import.meta.env.VITE_API_PATH;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let userSession = { isAuthenticated: false };

  useEffect(() => {
    fetch(`${API}/auth/status`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        userSession = data;
        console.log(userSession);
        setIsLoggedIn(userSession.isAuthenticated);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  function login() {
    window.location.href = `${API}/auth`;
  }

  function logout() {
    window.location.href = `${API}/auth/logout`;
  }

  return (
    <Container>
      <Box>
        {isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </Box>
      <Typography>{isLoggedIn ? "Logged In" : "Not Logged In"}</Typography>
    </Container>
  );
}

export default Home;

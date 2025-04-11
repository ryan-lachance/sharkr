import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

function NavBar({ userSession, login, logout }) {
  return (
    <AppBar elevation={1}>
      <Toolbar>
        <Typography variant="h6">Sharkr</Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        {userSession.isAuthenticated ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Button onClick={login}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

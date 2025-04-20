import { AppBar, Toolbar, Typography, Box, Button, Link } from "@mui/material";

function NavBar({ userSession, login, logout }) {
  return (
    <>
      <AppBar elevation={1}>
        <Toolbar>
          <Box
            component={Link}
            href="/home"
            sx={{ display: "flex", alignItems: "center", mr: 1 }}
          >
            <img
              src="logo.png"
              style={{ maxWidth: "32px", display: "block" }}
            />
          </Box>

          <Typography variant="h6">Sharkr</Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          {userSession.isAuthenticated ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button onClick={login}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default NavBar;

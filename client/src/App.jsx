import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Box, ThemeProvider } from "@mui/material";
import "./App.css";
import theme from "./assets/theme";
import CssBaseline from "@mui/material/CssBaseline";

//Pages
import Home from "./pages/Home";
import RemoveBorrowerPage from "./pages/RemoveBorrower";
import Initalize from "./pages/Initalize";
import Dashboard from "./pages/Dashboard";

//Components
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    fetch("http://localhost:2000/api/auth/status", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setIsLoggedIn(data.isAuthenticated))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        className="App"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          maxWidth: "100%", // remove or set maxWidth to  100%
          padding: 0, // remove any padding if needed
        }}
      >
        <BrowserRouter>
          <Box className="pages">
            <Routes>
              <Route path="/" element={<Initalize />} />
              <Route path="/Home" element={<Home />} />
              <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route
                path="/loans/:loanId/:borrowerId"
                element={<RemoveBorrowerPage />}
              />
            </Routes>
          </Box>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;

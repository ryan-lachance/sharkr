// theme.js or theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4070c2", // your custom blue or any color
    },
    secondary: {
      main: "#00b894", // optional: for secondary buttons
    },
    error: {
      main: "#821d20",
    },
    background: {
      default: "#17283d", // light gray, or any color you want
      paper: "#0b2a42",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
    },
  },
});

export default theme;

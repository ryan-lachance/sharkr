// theme.js or theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#244d91", // your custom blue or any color
    },
    secondary: {
      main: "#384254", // optional: for secondary buttons
    },
    error: {
      main: "#821d20",
    },
    background: {
      default: "#0b2a41", // light gray, or any color you want
      paper: "#0b2a41",
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

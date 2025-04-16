import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#244d91",
    },
    secondary: {
      main: "#384254",
    },
    error: {
      main: "#821d20",
    },
    textField: {},
    background: {
      default: "#0b2a41",
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
    MuiTextField: {
      defaultProps: {
        color: "textField",
      },
    },
  },
});

export default theme;

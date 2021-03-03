import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0e3c00",
    },
    secondary: {
      main: "#e8dd15",
    },
    info: {
      main: "#191919",
    },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 16,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
//23527c

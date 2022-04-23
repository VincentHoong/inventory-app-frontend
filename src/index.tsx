import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './index.css';
import { SnackbarProvider } from 'notistack';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "PT Sans Narrow", sans-serif',
  },
  palette: {
    primary: {
      main: "#673ab7",
    },
    secondary: {
      main: "#d1c4e9",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainRoutes from "routes/index.Routes";
import { createTheme, ThemeProvider } from "@mui/material";
function App() {
  const mainTheme = createTheme({
    typography: {
      fontFamily: "Vazirmatn, sans-serif",
    },
    direction: "rtl",
    palette: {
      primary: {
        main: "#1e272e",
      },
      secondary: {
        main: "#dce4ec",
        dark: "#808e9b",
      },
      success: {
        main: "#0be881",
        dark: "#05c46b",
      },
      info: {
        main: "#575fcf",
        dark: "#3c40c6",
      },
      error: {
        main: "#ff5e57",
        dark: "#ff3f34",
      },
      warning: {
        main: "#ffdd59",
        dark: "#ffd32a",
      },
    },
  });
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={mainTheme}>
          <Routes>
            <Route path="/tehranshoes/*" element={<MainRoutes />} />
            <Route path="/" element={<Navigate to="/tehranshoes" replace />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

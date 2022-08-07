import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainRoutes from "routes";
import { createTheme, ThemeProvider } from "@mui/material";
function App() {
  const mainTheme = createTheme({
    typography: {
      fontFamily: "Vazirmatn, sans-serif",
    },
    direction: "rtl",
    palette: {
      primary: {
        main: "#100F0F",
      },
      secondary: {
        main: "#F1F1F1",
      },
      success: {
        main: "#0F3D3E",
      },
      error: {
        main: "#B20600",
      },
      info: {
        main: "#E2DCC8",
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

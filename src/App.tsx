import { createTheme, ThemeProvider } from "@mui/material";
import { faIR } from "@mui/material/locale";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainRoutes from "routes/index.Routes";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./App.css";

function App() {
  AOS.init();
  const mode = useSelector((state: any) => state.theme.mode);
  const mainTheme = createTheme(
    {
      typography: {
        fontFamily: "Vazirmatn, sans-serif",
      },
      direction: "rtl",
      palette: {
        mode: mode,
        primary: {
          light: "#6b6e70",
          main: "#1e272e",
        },
        secondary: {
          light: "#EFEFEF",
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
    },
    faIR
  );
  return (
    <BrowserRouter>
      <ThemeProvider theme={mainTheme}>
        <Routes>
          <Route path="/tehranshoes/*" element={<MainRoutes />} />
          <Route path="/" element={<Navigate to="/tehranshoes" replace />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

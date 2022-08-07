import { createTheme, easing, ThemeProvider } from "@mui/material";
import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import React from "react";

const UserLayout: React.FC<any> = ({ children }: { children: any }) => {
  const theme = createTheme({
    typography: {
      fontFamily: "Vazirmatn, sans-serif",
    },
    direction: "rtl",
  });
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <div style={{ marginTop: "10%" }}>{children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default UserLayout;

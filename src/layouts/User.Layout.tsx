import { Paper } from "@mui/material";
import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import React from "react";

const UserLayout: React.FC<any> = ({ children }: { children: any }) => {
  return (
    <div>
      <Header navHeight="10%" />
      <Paper sx={{ paddingTop: "5%" }}>{children}</Paper>
      <Footer />
    </div>
  );
};

export default UserLayout;

import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import React from "react";

const UserLayout: React.FC<any> = ({ children }: { children: any }) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "10%" }}>{children}</div>
      <Footer />
    </div>
  );
};

export default UserLayout;
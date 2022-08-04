import UserLayout from "layouts/UserLayout";
import React from "react";

interface props {}

const Home: React.FC<props> = () => {
  return (
    <UserLayout>
      <div>Home</div>
    </UserLayout>
  );
};

export default Home;

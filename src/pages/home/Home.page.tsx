import { Box, Container, Grid, Typography } from "@mui/material";
import Slider from "components/slider/Slider";
import UserLayout from "layouts/User.Layout";
import React, { useEffect, useState } from "react";
import { getPostersService } from "services/services.services";

interface props {}

const Home: React.FC<props> = () => {
  const [posters, setPosters] = useState<string[]>([]);
  useEffect(() => {
    getPostersService()
      .then((res: any) => setPosters(res))
      .catch((e) => console.log(e));
  }, []);

  return (
    <UserLayout>
      <Container maxWidth="lg">
        <Slider images={posters} />
      </Container>
    </UserLayout>
  );
};

export default Home;

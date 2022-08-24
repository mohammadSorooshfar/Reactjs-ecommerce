import { Container } from "@mui/material";
import React from "react";
import Lottie from "react-lottie";
import animationSuccessful from "assets/lotties/successful.json";

interface props {}

const Payment: React.FC<props> = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationSuccessful,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Container maxWidth={"lg"} sx={{ padding: 5 }}>
      <Lottie options={defaultOptions} height={400} width={400} />
    </Container>
  );
};

export default Payment;

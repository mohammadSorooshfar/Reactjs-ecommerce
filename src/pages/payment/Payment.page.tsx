import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationSuccessful from "assets/lotties/successful.json";
import animationFailed from "assets/lotties/failed.json";
import { useLocation, useNavigate } from "react-router-dom";

interface props {}

const Payment: React.FC<props> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [duration, setDuration] = useState(5);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData:
      location.pathname === "/tehranshoes/pay/payment/failed"
        ? animationFailed
        : animationSuccessful,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    const timer = setInterval(
      () => setDuration((prev: number) => prev - 1),
      1000
    );
    setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Container
      maxWidth={"lg"}
      sx={{ padding: 5, display: "flex", justifyContent: "space-between" }}
    >
      <Typography variant="h6">{duration}</Typography>
      <Lottie options={defaultOptions} height={400} width={400} />
    </Container>
  );
};

export default Payment;

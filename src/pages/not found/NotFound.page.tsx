import { Paper, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import notFound from "assets/lotties/notFound.json";
import Lottie from "react-lottie";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: notFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Paper
      sx={{
        marginRight: "auto",
        marginLeft: "auto",
        borderRadius: "0px",
      }}
    >
      <Lottie options={defaultOptions} height={500} width={500} />
    </Paper>
  );
};

export default NotFound;

import React from "react";
import skate from "assets/skateboard.jpg";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const NewsLetter: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        height: "500px",
        backgroundColor: "#000000",
        zIndex: 2,
      }}
    >
      <Box
        position={"absolute"}
        top={"50%"}
        right={"50%"}
        sx={{
          transform: "translate(50%,-50%)",
          zIndex: 3,
        }}
      >
        <Typography color={"#EFEFEF"} variant="h3" fontWeight={"700"} mb={8}>
          به{" "}
          <Typography
            component={"span"}
            variant="h3"
            color={"error"}
            fontWeight={"700"}
          >
            خبرنامه
          </Typography>{" "}
          ما بپیوندید
        </Typography>
        <TextField
          placeholder="ایمیل خود را وارد کنید"
          sx={{
            backgroundColor: "secondary.light",
            width: "600px",
            borderRadius: "20px",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AddCircleIcon color="error" sx={{ fontSize: "40px" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <img
        src={skate}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: "0.25",
        }}
      />
    </div>
  );
};

export default NewsLetter;

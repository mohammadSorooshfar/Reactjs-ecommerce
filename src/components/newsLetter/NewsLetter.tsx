import React from "react";
import skate from "assets/skateboard.jpg";
import {
  Box,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const NewsLetter: React.FC = () => {
  return (
    <Paper
      sx={{
        width: "100%",
        position: "relative",
        backgroundColor: "#000000",
        zIndex: 2,
        height: "500px",
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
        <Typography color={"#EFEFEF"} variant={"h3"} fontWeight={"700"} mb={8}>
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
            width: { sm: "600px", xs: "300px" },
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
          height: "500px",
          objectFit: "cover",
          opacity: "0.25",
        }}
      />
    </Paper>
  );
};

export default NewsLetter;

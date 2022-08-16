import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { BASE_URL, IMAGES } from "configs/url.config";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface props {
  images: string[];
}

export default function Slider({ images }: props) {
  const navigate = useNavigate();
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        style={{
          height: "600px",
        }}
      >
        {images.map((image) => (
          <SwiperSlide>
            <Grid container>
              <Grid item sm={5}>
                <Box
                  sx={{
                    textAlign: "right",
                  }}
                >
                  <Typography variant="h1" fontWeight={"700"}>
                    حراج تابستان
                  </Typography>
                  <Typography
                    variant="h2"
                    color={"error.main"}
                    fontWeight={"700"}
                  >
                    ۱۴۰۱
                  </Typography>
                  <Typography variant="h4">
                    پایانی بر سردرگمی های انتخاب یک کفش مناسب
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    size="large"
                    onClick={() => navigate("products")}
                  >
                    خرید
                  </Button>
                </Box>
              </Grid>
              <Grid item sm={5}>
                <img
                  src={`
          ${BASE_URL}${IMAGES}/${image}
        `}
                  style={{
                    width: "100%",
                    height: " 100%",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                  alt=""
                />
              </Grid>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

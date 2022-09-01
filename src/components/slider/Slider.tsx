import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { BASE_URL, IMAGES } from "configs/url.config";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface props {
  images: string[];
}
const text: { title: string; description: string }[] = [
  {
    title: " حراج تابستان",
    description: " پایانی بر سردرگمی های انتخاب یک کفش مناسب",
  },
  {
    title: " اینجا پیداش می‌کنی! ",
    description: "خاص ترین مدل های کفش رسمی زنانه و مردانه",
  },
  {
    title: " انتخاب با خیالی آسوده",
    description:
      "فقط با یک بار ثبت سفارش عضو باشگاه مشتریان کفش طهران  شو و از امکانات متنوعش لذت ببر",
  },
  {
    title: " نگران نباش !!",
    description:
      "دیگه نگران پیاده روی های طولانی نباش کفش طهران با کفش های کتانی راحت،  تجربه یه پیاده روی خوب رو برات رقم میزنه",
  },
];

export default function Slider({ images }: props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingBottom: 5,
        backgroundColor: "secondary",
        marginTop: matches ? 5 : "",
      }}
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        style={{
          height: matches ? "800px" : "600px",

          objectFit: "fill",
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide>
            <Box position={"relative"} width={"100%"}>
              <Box
                position={"absolute"}
                textAlign={"right"}
                pr={5}
                pt={10}
                maxWidth={"40%"}
                display={matches ? "none" : "block"}
              >
                <Typography
                  color={index % 2 === 0 ? "white" : "black"}
                  variant="h2"
                  fontWeight={"700"}
                >
                  {text[index % text.length].title}
                </Typography>
                <Typography
                  color={index % 2 === 0 ? "white" : "black"}
                  variant="h4"
                  mt={5}
                  maxWidth={"90%"}
                >
                  {text[index % text.length].description}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 5, width: "40%" }}
                  size="large"
                  onClick={() => navigate("products")}
                >
                  خرید
                </Button>
              </Box>
              <img
                src={`
          ${BASE_URL}${IMAGES}/${image}
        `}
                style={{
                  width: "100%",
                  height: matches ? "500px" : " 600px",
                  objectFit: matches ? "contain" : "fill",
                }}
                alt=""
              />
              <Box
                textAlign={"center"}
                display={matches ? "block" : "none"}
                marginTop={2}
              >
                <Typography variant="h4" fontWeight={"700"}>
                  {text[index % text.length].title}
                </Typography>
                <Typography variant="h6" mt={3}>
                  {text[index % text.length].description}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 3 }}
                  size="large"
                  onClick={() => navigate("products")}
                >
                  خرید
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

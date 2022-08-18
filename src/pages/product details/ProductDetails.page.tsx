import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { BASE_URL, IMAGES } from "configs/url.config";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductService } from "services/services.services";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Controller, Navigation, Pagination, Thumbs } from "swiper";
import { IProduct } from "types/interfaces.types";
import { colorGenerator, persianNumber } from "utils/functions.util";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

interface props {}

const ProductDetails: React.FC<props> = () => {
  const { id = "" } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const [selectedColor, setSelectedColor] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  useEffect(() => {
    getProductService(id)
      .then((res) => setProduct(res))
      .catch((e) => console.log(e));
  }, [id]);
  const swiperItems = () =>
    product?.images.map((image) => (
      <SwiperSlide>
        <img
          src={`${BASE_URL}${IMAGES}/${image}`}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </SwiperSlide>
    ));
  const ColorCircleStyle = styled(Box)<{ shoeColor?: string }>(
    ({ shoeColor }) => ({
      borderRadius: "50%",
      backgroundColor: shoeColor,
      width: 25,
      height: 25,
    })
  );
  const CircleBoxStyle = styled(Box)<{ selected: boolean }>(({ selected }) => ({
    borderRadius: "50%",
    padding: 3,
    border: selected ? "2px solid blue" : "2px solid #d4d0d0",
    marginRight: 5,
    "&:hover": {
      cursor: "pointer",
    },
  }));
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Swiper
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            navigation={true}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination, Thumbs]}
            style={{
              height: "500px",
            }}
          >
            {swiperItems()}
          </Swiper>
          <Swiper
            style={{ marginTop: "10px" }}
            spaceBetween={5}
            slidesPerView={4}
            modules={[Thumbs]}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
          >
            {swiperItems()}
          </Swiper>
        </Grid>
        <Grid item sm={6} padding={4} minHeight={"100%"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            minHeight={"70%"}
          >
            <Breadcrumbs separator={<NavigateBeforeIcon fontSize="small" />}>
              <Typography color="text.primary">محصولات</Typography>
              <Typography color="text.primary">{product?.gender.fa}</Typography>
              <Typography color="text.primary">
                {product?.category.fa}
              </Typography>
            </Breadcrumbs>
            <Typography variant="h3" textAlign={"right"}>
              {product?.name}
            </Typography>
            <Typography variant="subtitle2" textAlign={"right"}>
              {product?.description}
            </Typography>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Box>
                <Typography variant="h5">
                  رنگ: {product?.colors[selectedColor]}
                </Typography>
                <Box display={"flex"} marginTop={3}>
                  {product?.colors.map((color, index) => (
                    <CircleBoxStyle
                      selected={index === selectedColor}
                      onClick={() => setSelectedColor(index)}
                    >
                      <ColorCircleStyle shoeColor={colorGenerator(color)} />
                    </CircleBoxStyle>
                  ))}
                </Box>
              </Box>
              <Typography variant="h5">
                قیمت: {product ? persianNumber(product.price.toString()) : ""}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"100%"}
            >
              <TextField
                type="number"
                placeholder="تعداد"
                size="small"
                sx={{ width: "20%" }}
              />
              <Button variant="contained" color="success" size="large">
                افزودن به سبد خرید
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;

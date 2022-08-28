import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
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
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "redux/cart";
import { getProductService } from "services/services.services";
import { Navigation, Pagination, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICart, IProduct } from "types/interfaces.types";
import { colorGenerator, persianNumber } from "utils/functions.util";

interface props {}

const ProductDetails: React.FC<props> = () => {
  const { id = "" } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const [selectedColor, setSelectedColor] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const cartProducts = useSelector((state: any) => state.cart.cartProducts);
  const [cartItem, setCartItem] = useState(
    cartProducts.find((product: ICart) => product.id === +id)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItem(cartProducts.find((product: ICart) => product.id === +id));
    console.log(cartItem);
  }, [cartProducts]);

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
              <Link
                to={`/tehranshoes/products`}
                style={{ textDecoration: "none" }}
              >
                <Typography color="text.primary">محصولات</Typography>{" "}
              </Link>
              <Link
                to={`/tehranshoes/products/${product?.gender.en}/all`}
                style={{ textDecoration: "none" }}
              >
                <Typography color="text.primary">
                  {product?.gender.fa}
                </Typography>
              </Link>
              <Link
                to={`/tehranshoes/products/all/${product?.category.en}`}
                style={{ textDecoration: "none" }}
              >
                <Typography color="text.primary">
                  {product?.category.fa}
                </Typography>
              </Link>
            </Breadcrumbs>
            <Typography variant="h3" textAlign={"right"}>
              {product?.name}
            </Typography>
            <Typography variant="subtitle2" textAlign={"right"}>
              <div
                dangerouslySetInnerHTML={{ __html: product?.description || "" }}
              ></div>
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
                قیمت: {product ? persianNumber(product.price.toString()) : ""}{" "}
                تومان
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
                InputProps={{ inputProps: { min: 1, max: product?.inventory } }}
                value={quantity}
                onChange={(e) => {
                  console.log(
                    product &&
                      cartItem &&
                      +e.target.value > product?.inventory - cartItem.quantity
                  );

                  if (+e.target.value < 1) {
                    setQuantity(1);
                  } else if (
                    product &&
                    ((cartItem &&
                      +e.target.value >
                        product?.inventory - cartItem.quantity) ||
                      +e.target.value > product?.inventory)
                  ) {
                    if (cartItem) {
                      setQuantity(product?.inventory - cartItem.quantity);
                    } else {
                      setQuantity(product?.inventory);
                    }
                  } else {
                    setQuantity(+e.target.value);
                  }
                }}
              />
              <Box>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  disabled={
                    product &&
                    cartItem &&
                    product?.inventory - cartItem.quantity <= 0
                  }
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: product?.id,
                        inventory: product?.inventory,
                        name: product?.name,
                        price: product?.price,
                        image: product?.images[0],
                        quantity,
                      })
                    );
                    setQuantity(1);
                  }}
                >
                  افزودن به سبد خرید
                </Button>
                <Typography
                  color={"error"}
                  display={
                    product &&
                    cartItem &&
                    product?.inventory - cartItem.quantity <= 0
                      ? "block"
                      : "none"
                  }
                >
                  موجودی به اتمام رسیده است!
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;

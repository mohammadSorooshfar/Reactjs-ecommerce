import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationSuccessful from "assets/lotties/successful.json";
import animationFailed from "assets/lotties/failed.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeCart } from "redux/cart";

interface props {}

const Payment: React.FC<props> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [duration, setDuration] = useState(5);
  const failed = location.pathname === "/tehranshoes/pay/payment/failed";
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: failed ? animationFailed : animationSuccessful,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    !failed && dispatch(removeCart());
    const timer = setInterval(
      () => setDuration((prev: number) => prev - 1),
      1000
    );
    setTimeout(() => {
      failed ? navigate("/tehranshoes/pay/checkout") : navigate("/");
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Container maxWidth={"lg"} sx={{ padding: 5 }}>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid item xs={12} md={6}>
          <Lottie options={defaultOptions} height={matches ? 400 : 500} />
        </Grid>{" "}
        <Grid item xs={12} md={6} paddingLeft={matches ? "" : 10}>
          <Typography variant="h6" textAlign={matches ? "center" : "right"}>
            {failed
              ? "پرداخت موفقیت آمیز نبود، سفارش شما در انتظار پرداخت است"
              : "با تشکر از پرداخت شما، سفارش شما ثبت شده و جهت هماهنگی ارسال با شما تماس گرفته خواهد شد"}
          </Typography>
          <Typography
            variant="body1"
            textAlign={matches ? "center" : "right"}
            marginTop={3}
          >
            بعد از {duration} ثانیه به {failed ? "صفحه قبل" : "خانه"} باز
            گردانده می‌شوید...
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Payment;

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  styled,
  TextField,
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CartItem from "components/cartItem/CartItem";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTotalToPay } from "redux/cart";
import { getSaleCodesService } from "services/services.services";
import { ICart } from "types/interfaces.types";
import { persianNumber } from "utils/functions.util";

interface props {}

const Cart: React.FC<props> = () => {
  const cartProducts = useSelector((state: any) => state.cart.cartProducts);
  const total = useSelector((state: any) => state.cart.total);
  const [saleCodes, setSaleCodes] = useState<string[]>([]);
  const [inputCode, setInputCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [sale, setSale] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    getSaleCodesService().then((res) => setSaleCodes(res));
  }, []);
  const checkCode = () => {
    const code = saleCodes.find((code: string) => code === inputCode);
    if (inputCode) {
      if (code) {
        setCodeError("");
        setSale(true);
      } else {
        setCodeError("کد وارد شده اشتباه است");
        setSale(false);
      }
    }
  };
  const ErrorTypographyStyle: any = styled(Typography)<TypographyProps>(
    ({ theme }) => ({
      color: theme.palette.error.main,
      paddingTop: "5px",
      fontSize: "12px",
    })
  );
  return (
    <Container maxWidth={"lg"} sx={{ paddingTop: matches ? 3 : "" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Paper sx={{ padding: matches ? 1 : 2 }}>
            <Typography
              textAlign={"right"}
              variant={"h5"}
              paddingBottom={1}
              fontWeight={"bold"}
            >
              سبد خرید
            </Typography>
            <Divider />
            <List>
              {cartProducts.length === 0 ? (
                <Typography variant="h6" marginY={4}>
                  سبد خرید خالی می‌باشد!
                </Typography>
              ) : (
                cartProducts.map((product: ICart, index: number) => (
                  <>
                    <ListItem
                      sx={{
                        justifyContent: "space-between",
                        padding: matches ? 1 : "",
                      }}
                      key={product.id}
                    >
                      <CartItem product={product} />
                    </ListItem>
                    {index === cartProducts.length - 1 ? "" : <Divider />}
                  </>
                ))
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography
              textAlign={"right"}
              variant={"h5"}
              paddingBottom={1}
              fontWeight={"bold"}
            >
              صورتحساب
            </Typography>

            <Divider />
            <Box padding={2}>
              <Typography textAlign={"right"} variant={"h6"} paddingBottom={1}>
                کد تخفیف
              </Typography>
              <Box display={"flex"} alignItems={"flex-start"}>
                <Box>
                  <TextField
                    placeholder="کد را وارد نمایید  "
                    size="small"
                    onChange={(e) => setInputCode(e.target.value)}
                    value={inputCode}
                  />

                  <ErrorTypographyStyle>{codeError}</ErrorTypographyStyle>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => checkCode()}
                  size={matches ? "small" : "medium"}
                  sx={{ paddingY: matches ? 1 : "" }}
                >
                  اعمال کد
                </Button>
              </Box>
            </Box>
            <Divider />
            <Box padding={2}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  textAlign={"right"}
                  variant={"body1"}
                  paddingBottom={1}
                >
                  مجموع
                </Typography>
                <Typography
                  textAlign={"right"}
                  variant={"body1"}
                  paddingBottom={1}
                >
                  {`${persianNumber(total.toString())} تومان`}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  textAlign={"right"}
                  variant={"body1"}
                  paddingBottom={1}
                >
                  مالیات (۵٪)
                </Typography>
                <Typography
                  textAlign={"right"}
                  variant={"body1"}
                  paddingBottom={1}
                >
                  {`${persianNumber((total / 20).toString())} تومان`}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  textAlign={"right"}
                  variant={"body1"}
                  paddingBottom={1}
                >
                  هزینه ارسال
                </Typography>
                <Typography
                  textAlign={"right"}
                  variant={"body1"}
                  paddingBottom={1}
                >
                  {`${persianNumber(
                    (cartProducts.length === 0 ? 0 : 15000).toString()
                  )} تومان`}
                </Typography>
              </Box>
              <Box
                display={sale ? "flex" : "none"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{ color: "#05c46b" }}
              >
                <Typography
                  textAlign={"right"}
                  variant={"body1"}
                  paddingBottom={1}
                >
                  تخفیف (10%-)
                </Typography>
                <Typography
                  textAlign={"right"}
                  variant={"body1"}
                  paddingBottom={1}
                >
                  {`${persianNumber((total / 10).toString())}- تومان`}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box
              padding={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography textAlign={"right"} variant={"h6"} paddingBottom={1}>
                مبلغ پرداختی
              </Typography>
              <Typography textAlign={"right"} variant={"h6"} paddingBottom={1}>
                {`${persianNumber(
                  (cartProducts.length === 0
                    ? 0
                    : sale
                    ? total + total / 20 + 15000 - total / 10
                    : total + total / 20 + 15000
                  ).toString()
                )} تومان`}
              </Typography>
            </Box>
            <Divider />
            <Box padding={2}>
              <Button
                fullWidth
                variant="contained"
                color="info"
                disabled={cartProducts.length === 0}
                onClick={() => {
                  dispatch(
                    setTotalToPay(
                      sale
                        ? total + total / 20 + 15000 - total / 10
                        : total + total / 20 + 15000
                    )
                  );
                  navigate("/tehranshoes/pay/checkout");
                }}
              >
                نهایی کردن خرید
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;

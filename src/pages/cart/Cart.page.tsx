import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CartItem from "components/cartItem/CartItem";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ICart } from "types/interfaces.types";
import { persianNumber } from "utils/functions.util";

interface props {}

const Cart: React.FC<props> = () => {
  const cartProducts = useSelector((state: any) => state.cart.cartProducts);
  const total = useSelector((state: any) => state.cart.total);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(cartProducts);
  }, [cartProducts]);

  return (
    <Container maxWidth={"lg"}>
      <Grid container spacing={2}>
        <Grid item sm={8}>
          <Paper sx={{ padding: 2 }}>
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
                      sx={{ justifyContent: "space-between" }}
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
        <Grid item sm={4}>
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
              <Box display={"flex"} alignItems={"center"}>
                <TextField placeholder="کد را وارد نمایید  " size="small" />
                <Button variant="contained" color="primary">
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
                onClick={() => navigate("/tehranshoes/pay/checkout")}
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

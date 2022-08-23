import {
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import CartItem from "components/cartItem/CartItem";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ICart } from "types/interfaces.types";

interface props {}

const Cart: React.FC<props> = () => {
  const cartProducts = useSelector((state: any) => state.cart.cartProducts);
  useEffect(() => {
    console.log(cartProducts);
  }, [cartProducts]);

  return (
    <Container maxWidth={"lg"}>
      <Grid container>
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
              {cartProducts.map((product: ICart, index: number) => (
                <>
                  <ListItem
                    sx={{ justifyContent: "space-between" }}
                    key={product.id}
                  >
                    <CartItem product={product} />
                  </ListItem>
                  {index === cartProducts.length - 1 ? "" : <Divider />}
                </>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item sm={4}>
          <Paper></Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;

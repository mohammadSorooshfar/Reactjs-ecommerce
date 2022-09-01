import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { match } from "assert";
import { BASE_URL, IMAGES } from "configs/url.config";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeItemQuantity, deleteItem } from "redux/cart";
import { ICart } from "types/interfaces.types";
import { persianNumber } from "utils/functions.util";
interface props {
  product: ICart;
}

const CartItem: React.FC<props> = ({ product }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <ListItemAvatar>
        <Avatar
          src={`${BASE_URL}${IMAGES}/${product.image}`}
          variant={"rounded"}
          sx={{
            width: matches ? "50px" : "100px",
            height: matches ? "50px" : "100px",
          }}
        />
      </ListItemAvatar>
      <Box sx={{ textAlign: "right", width: matches ? "70px" : "150px" }}>
        <Link
          to={`/tehranshoes/product/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemText
            primary={product.name}
            secondary={`${persianNumber(product.price.toString())} تومان`}
            sx={{
              "& .MuiTypography-root": { fontSize: matches ? "12px" : "1rem" },
            }}
          />
        </Link>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        border={"1px solid #ccc"}
        borderRadius={"10px"}
        fontSize={"10px"}
      >
        <ListItemButton
          onClick={() =>
            dispatch(
              changeItemQuantity({
                quantity: product.quantity - 1,
                id: product.id,
              })
            )
          }
          disabled={product.quantity - 1 === 0}
          sx={{ padding: matches ? "5px" : "" }}
        >
          <RemoveIcon fontSize={matches ? "inherit" : "small"} />
        </ListItemButton>
        <Typography variant={matches ? "subtitle2" : "body1"}>
          {product.quantity}
        </Typography>
        <ListItemButton
          onClick={() =>
            dispatch(
              changeItemQuantity({
                quantity: product.quantity + 1,
                id: product.id,
              })
            )
          }
          disabled={product.quantity === product.inventory}
          sx={{ padding: matches ? "5px" : "" }}
        >
          <AddIcon fontSize={matches ? "inherit" : "small"} />
        </ListItemButton>
      </Box>
      <Box>
        <Typography
          fontWeight={"bold"}
          sx={{ fontSize: matches ? "12px" : "16px" }}
        >
          {persianNumber((product.quantity * product.price).toString())} تومان{" "}
        </Typography>
      </Box>
      <Box>
        <ListItemButton
          onClick={() =>
            dispatch(
              deleteItem({
                id: product.id,
              })
            )
          }
          sx={{ fontSize: matches ? "15px" : "" }}
        >
          <DeleteIcon fontSize={matches ? "inherit" : "medium"} color="error" />
        </ListItemButton>
      </Box>
    </>
  );
};

export default CartItem;

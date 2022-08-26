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
} from "@mui/material";
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
  return (
    <>
      <ListItemAvatar>
        <Avatar
          src={`${BASE_URL}${IMAGES}/${product.image}`}
          variant={"rounded"}
          sx={{ width: "100px", height: "100px" }}
        />
      </ListItemAvatar>
      <Box sx={{ textAlign: "right", width: "200px" }}>
        <Link
          to={`/tehranshoes/product/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemText
            primary={product.name}
            secondary={`${persianNumber(product.price.toString())} تومان`}
          />
        </Link>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        border={"1px solid #ccc"}
        borderRadius={"10px"}
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
        >
          <RemoveIcon fontSize="small" />
        </ListItemButton>
        <Typography>{product.quantity}</Typography>
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
        >
          <AddIcon fontSize="small" />
        </ListItemButton>
      </Box>
      <Box>
        <Typography fontWeight={"bold"}>
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
        >
          <DeleteIcon fontSize="medium" color="error" />
        </ListItemButton>
      </Box>
    </>
  );
};

export default CartItem;

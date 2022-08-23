import {
  Avatar,
  Box,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { BASE_URL, IMAGES } from "configs/url.config";
import React, { useState } from "react";
import { ICart } from "types/interfaces.types";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { changeItemQuantity, deleteItem } from "redux/cart";
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
        <ListItemText
          primary={product.name}
          secondary={`${persianNumber(product.price.toString())} تومان`}
        />
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
          <DeleteIcon fontSize="medium" />
        </ListItemButton>
      </Box>
    </>
  );
};

export default CartItem;

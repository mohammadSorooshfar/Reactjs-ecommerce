import { createSlice } from "@reduxjs/toolkit";
import { ICart, IProduct } from "types/interfaces.types";

interface IState {
  cartProducts: ICart[];
  total: number;
  totalToPay: number;
}

const initialState: IState = {
  cartProducts: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "")
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total") || "")
    : 0,
  totalToPay: localStorage.getItem("totalToPay")
    ? JSON.parse(localStorage.getItem("totalToPay") || "")
    : 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const index = state.cartProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index === -1) {
        state.cartProducts.push(action.payload);
      } else {
        state.cartProducts[index].quantity += action.payload.quantity;
      }
      state.total += action.payload.quantity * action.payload.price;
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
      localStorage.setItem("total", JSON.stringify(state.total));
    },
    changeItemQuantity(state, action) {
      const index = state.cartProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      state.total +=
        (action.payload.quantity - state.cartProducts[index].quantity) *
        state.cartProducts[index].price;

      state.cartProducts[index].quantity = action.payload.quantity;
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
      localStorage.setItem("total", JSON.stringify(state.total));
    },
    deleteItem(state, action) {
      const index = state.cartProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      state.total -=
        state.cartProducts[index].quantity * state.cartProducts[index].price;
      state.cartProducts.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
      localStorage.setItem("total", JSON.stringify(state.total));
    },
    removeCart(state) {
      state.cartProducts = [];
      state.total = 0;
      setTimeout(() => {
        localStorage.removeItem("cart");
        localStorage.removeItem("total");
      }, 6000);
    },
    setTotalToPay(state, action) {
      state.totalToPay = action.payload;
      localStorage.setItem("totalToPay", JSON.stringify(state.totalToPay));
    },
  },
});

export const {
  addToCart,
  changeItemQuantity,
  deleteItem,
  removeCart,
  setTotalToPay,
} = cartSlice.actions;
export default cartSlice.reducer;

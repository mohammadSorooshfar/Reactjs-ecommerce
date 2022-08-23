import { createSlice } from "@reduxjs/toolkit";
import { ICart, IProduct } from "types/interfaces.types";

interface IState {
  cartProducts: ICart[];
  total: number;
}

const initialState: IState = {
  cartProducts: [],
  total: 0,
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
    },
    changeItemQuantity(state, action) {
      const index = state.cartProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      state.total +=
        (action.payload.quantity - state.cartProducts[index].quantity) *
        state.cartProducts[index].price;

      state.cartProducts[index].quantity = action.payload.quantity;
    },
    deleteItem(state, action) {
      const index = state.cartProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      state.total -=
        state.cartProducts[index].quantity * state.cartProducts[index].price;
      state.cartProducts.splice(index, 1);
    },
  },
});

export const { addToCart, changeItemQuantity, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;

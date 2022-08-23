import { createSlice } from "@reduxjs/toolkit";
import { ICart, IProduct } from "types/interfaces.types";

interface IState {
  cartProducts: ICart[];
}

const initialState: IState = {
  cartProducts: [],
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
    },
    changeItemQuantity(state, action) {
      const index = state.cartProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      state.cartProducts[index].quantity = action.payload.quantity;
    },
    deleteItem(state, action) {
      const index = state.cartProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      state.cartProducts.slice(index, 1);
    },
  },
});

export const { addToCart, changeItemQuantity, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;

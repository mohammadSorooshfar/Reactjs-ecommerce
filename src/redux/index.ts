import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import productsReducer from "./products";
import ordersReducer from "./orders";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    orders: ordersReducer,
  },
});

export default store;
// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

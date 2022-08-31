import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import productsReducer from "./products";
import ordersReducer from "./orders";
import themeReducer from "./theme";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    orders: ordersReducer,
    theme: themeReducer,
  },
});

export default store;
// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

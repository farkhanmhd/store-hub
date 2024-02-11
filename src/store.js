import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    cart: cartSlice,
  },
});

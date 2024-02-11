import { createSlice } from "@reduxjs/toolkit";

const updateQtyAndTotal = (state) => {
  state.quantityTotal = state.items.reduce((acc, item) => acc + item.qty, 0);
  state.total = state.items
    .reduce((acc, item) => acc + item.subTotal, 0)
    .toFixed(2);
};

const saveCart = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

export const cartSlice = createSlice({
  name: "carts",
  initialState: {
    items: [],
    quantityTotal: 0,
    total: 0,
  },
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
    addToCart: (state, action) => {
      const { id, title, description, price, image } = action.payload;

      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.qty += 1;
        existingItem.subTotal = existingItem.qty * existingItem.price;
      } else {
        state.items.push({
          id,
          title,
          description,
          price,
          image,
          qty: 1,
          subTotal: price,
        });
      }
      updateQtyAndTotal(state);
      saveCart(state);
    },

    reduceQty: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.qty -= 1;
        existingItem.subTotal = existingItem.qty * existingItem.price;
        if (existingItem.qty === 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
      updateQtyAndTotal(state);
      saveCart(state);
    },
  },
});

export const { setCart, addToCart, reduceQty } = cartSlice.actions;

export default cartSlice.reducer;

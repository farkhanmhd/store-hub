import { createSlice } from "@reduxjs/toolkit";

const existingTarget = (state, username, id) => {
  const existingUsername = state.find((user) => user.username === username);
  const existingItem = existingUsername.items.find((item) => item.id === id);
  return [existingUsername, existingItem];
};

const updateQtyAndTotal = (state, username) => {
  const indexTarget = state.findIndex((user) => user.username === username);
  state[indexTarget].quantityTotal = state[indexTarget].items.reduce(
    (acc, item) => acc + item.qty,
    0
  );
  state[indexTarget].total = state[indexTarget].items
    .reduce((acc, item) => acc + item.subTotal, 0)
    .toFixed(2);
};

const saveCart = (state) => {
  localStorage.setItem("carts", JSON.stringify(state));
};

export const cartSlice = createSlice({
  name: "carts",
  initialState: [{ username: "johnd", items: [], quantityTotal: 0, total: 0 }],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
    addToCart: (state, action) => {
      const { username, id, title, description, price, image } = action.payload;
      const [existingUsername, existingItem] = existingTarget(
        state,
        username,
        id
      );

      if (existingUsername) {
        if (existingItem) {
          existingItem.qty += 1;
          existingItem.subTotal = existingItem.qty * existingItem.price;
        } else {
          existingUsername.items.push({
            id,
            title,
            description,
            price,
            image,
            qty: 1,
            subTotal: price,
          });
        }
      } else {
        const newCart = {
          username,
          items: [
            {
              id,
              title,
              description,
              price,
              image,
              qty: 1,
              subTotal: price,
            },
          ],
          quantityTotal: 1,
          total: price,
        };
        state.push(newCart);
      }
      updateQtyAndTotal(state, username);
      saveCart(state);
    },
    reduceQty: (state, action) => {
      const { username, id } = action.payload;

      const [existingUsername, existingItem] = existingTarget(
        state,
        username,
        id
      );

      existingItem.qty -= 1;
      if (existingItem.qty === 0) {
        existingUsername.items = existingUsername.items.filter(
          (item) => item !== existingItem
        );
      }
      existingItem.subTotal = existingItem.qty * existingItem.price;

      updateQtyAndTotal(state, username);
      saveCart(state);
    },

    removeCart: (state, action) => {
      const { username, id } = action.payload;
      const [existingUsername, existingItem] = existingTarget(
        state,
        username,
        id
      );
      existingUsername.items = existingUsername.items.filter(
        (item) => item !== existingItem
      );

      updateQtyAndTotal(state, username);
      saveCart(state);
    },
  },
});

export const { setCart, addToCart, reduceQty, removeCart } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    password: "",
    authed: false,
  },
  reducers: {
    setUserInput: (state, action) => {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    },

    setUserData: (state, action) => {
      const { username, password, authed } = action.payload;
      return { ...state, username, password, authed };
    },
  },
});

export const { setUserInput, setUserData } = userSlice.actions;

export default userSlice.reducer;

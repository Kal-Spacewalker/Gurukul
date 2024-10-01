import { configureStore, createReducer } from "@reduxjs/toolkit";

import userReducer from "../src/Features/User/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

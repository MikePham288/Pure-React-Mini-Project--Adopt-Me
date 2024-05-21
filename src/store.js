import { configureStore } from "@reduxjs/toolkit";
import adoptedPetSlice from "./adoptedPetSlice";

const store = configureStore({
  reducer: {
    adoptedPetSlice,
  },
});

export default store;

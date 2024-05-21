import { createSlice } from "@reduxjs/toolkit";

/**
 * Essentially this is what it does under the hood
 * @example
 * function adopt(pet) {
 *    return { payload:  pet, type: "adopt"}
 * }
 */
export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState: {
    value: null,
  },
  reducers: {
    adopt: (state, action) => {
      state.value = action.payload;
    },
    // unadopt: (state, action) => {
    //   state.value = null;
    // },
  },
});

export const { adopt } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;

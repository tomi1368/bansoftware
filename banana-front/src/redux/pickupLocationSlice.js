import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPickUpLocations } from "../api";

export const fetchPickupLocations = createAsyncThunk(
  "pickupLocations/fetchPickupLocations",
  async () => {
    const response = await getPickUpLocations();
    return response.data;
  }
);

const pickupLocationSlice = createSlice({
  name: "pickupLocations",
  initialState: {
    pickupLocations: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPickupLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPickupLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pickupLocations = action.payload;
      })
      .addCase(fetchPickupLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default pickupLocationSlice.reducer;

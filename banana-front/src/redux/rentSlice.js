import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRents, rentVehicle, returnVehicle } from "../api";

export const fetchRents = createAsyncThunk(
  "rents/fetchRents",
  async (payload) => {
    const response = await getRents(payload);
    return response.data;
  }
);

export const rentAVehicle = createAsyncThunk(
  "rents/rentVehicle",
  async ({ vehicle_id, user_dni, pickup_location_id }) => {
    const response = await rentVehicle({
      vehicle_id,
      user_dni,
      pickup_location_id,
    });
    return response.data;
  }
);

export const finishRent = createAsyncThunk(
  "rents/finishRent",
  async ({ vehicle_id, user_dni, pickup_location_id }) => {
    const response = await returnVehicle({
      vehicle_id,
      user_dni,
      pickup_location_id,
    });
    return response.data;
  }
);

const rentSlice = createSlice({
  name: "rents",
  initialState: {
    rents: { data: [], status: "idle", error: null },
    newRent: { data: null, status: "idle", error: null },
    finishRent: { data: null, status: "idle", error: null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRents.pending, (state) => {
        state.rents.status = "loading";
      })
      .addCase(fetchRents.fulfilled, (state, action) => {
        state.rents.status = "succeeded";
        state.rents.data = action.payload;
      })
      .addCase(fetchRents.rejected, (state, action) => {
        state.rents.status = "failed";
        state.rents.error = action.error.message;
      })
      .addCase(rentAVehicle.pending, (state) => {
        state.newRent.status = "loading";
      })
      .addCase(rentAVehicle.fulfilled, (state, action) => {
        state.newRent.status = "succeeded";
        state.newRent.data = action.payload;
      })
      .addCase(rentAVehicle.rejected, (state, action) => {
        state.newRent.status = "failed";
        state.newRent.error = action.error.message;
      })
      .addCase(finishRent.pending, (state) => {
        state.finishRent.status = "loading";
      })
      .addCase(finishRent.fulfilled, (state, action) => {
        state.finishRent.status = "succeeded";
        state.finishRent.data = action.payload;
      })
      .addCase(finishRent.rejected, (state, action) => {
        state.finishRent.status = "failed";
        state.finishRent.error = action.error.message;
      });
  },
});

export default rentSlice.reducer;

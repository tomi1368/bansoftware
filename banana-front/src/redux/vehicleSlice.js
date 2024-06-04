import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVehiclesByLocation } from "../api";

export const fetchVehiclesByLocation = createAsyncThunk(
  "vehicles/fetchVehiclesByLocation",
  async (locationId) => {
    const response = await getVehiclesByLocation(locationId);
    return response.data;
  }
);

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState: {
    vehicles: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehiclesByLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVehiclesByLocation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vehicles = action.payload;
      })
      .addCase(fetchVehiclesByLocation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default vehicleSlice.reducer;

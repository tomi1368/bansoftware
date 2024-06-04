import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import pickupLocationReducer from "./pickupLocationSlice";
import rentReducer from "./rentSlice";
import vehicleReducer from "./vehicleSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    pickupLocations: pickupLocationReducer,
    rents: rentReducer,
    vehicles: vehicleReducer,
  },
});

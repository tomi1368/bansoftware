import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust the base URL as needed
});

export const getPickUpLocations = () => api.get("/pickup-location");
export const getUser = (user_dni) => api.get(`/user?user_dni=${user_dni}`);
export const getRents = ({ user_dni, createdAt, endDate }) =>
  api.post(`/rent/report`, { user_dni, createdAt, endDate });
export const rentVehicle = (data) => api.post("/rent", data);
export const returnVehicle = (data) => api.post("/rent/return", data);
export const getVehiclesByLocation = (location) =>
  api.get(`/vehicles?pickup_location_id_fk=${location}&available=true`);

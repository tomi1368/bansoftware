import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { rentAVehicle } from "../redux/rentSlice"
import {Container,Input,Button,Title} from "../components/StyledComponents"
import GoHomeButton from './GoHome';
const RentVehicle = () => {
  const { id } = useParams(); // vehicle_id
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pickupLocationId = searchParams.get('location');
  const [dni, setDni] = useState('');
  const dispatch = useDispatch();
  const rentStatus = useSelector((state) => state.rents.newRent.status);
  const rentError = useSelector((state) => state.rents.newRent.error);
  const rent = useSelector((state)=>state.rents.newRent.data)
  const handleRent = () => {
    dispatch(rentAVehicle({ vehicle_id: id, user_dni: dni,pickup_location_id:pickupLocationId }));
  };


  return (
    <Container>
      <GoHomeButton></GoHomeButton>
      <Title>Rent Vehicle</Title>
      <p>Location: {pickupLocationId}</p>
      <Input
        type="number"
        disabled={rentStatus === "loading"}
        placeholder="Enter your DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
      />
      <Button disabled={rentStatus === 'loading'} onClick={handleRent}>Rent</Button>
      {rentStatus === 'loading' && <p>Processing...</p>}
      {rentStatus === 'succeeded' && <p>You have {rent.timeToRent} minutes to use this vehicle.</p>}
      {rentStatus === 'failed' && <p>Error: {rentError}</p>}
    </Container>
  );
};

export default RentVehicle;
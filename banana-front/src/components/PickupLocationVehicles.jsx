import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchVehiclesByLocation } from '../redux/vehicleSlice';
import {StyledLink,StyledList} from "./StyledComponents"
const LocationVehicles = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
 const vehicles = useSelector((state) => state.vehicles.vehicles);
  const status = useSelector((state) => state.vehicles.status);
  const error = useSelector((state) => state.vehicles.error);

  useEffect(() => {
    dispatch(fetchVehiclesByLocation(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  return (
    <StyledList>
      {vehicles.map((vehicle)  => (
        <StyledLink key={vehicle.vehicle_id} to={`/rent/${vehicle.vehicle_id}?location=${id}`}>
          {`Vehiculo ${vehicle.vehicle_id}`}
        </StyledLink>
      ))}
    </StyledList>
  );
};

export default LocationVehicles;
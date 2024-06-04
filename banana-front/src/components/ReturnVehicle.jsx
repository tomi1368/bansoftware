import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { finishRent } from "../redux/rentSlice";
import { Container, Input, Button,Title} from "./StyledComponents";
import GoHomeButton from "./GoHome";

const ReturnVehicle = () => {
  const [dni, setDni] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [pickupLocationId, setPickupLocationId] = useState("");
  const dispatch = useDispatch();
  const returnRent = useSelector(state=>state.rents.finishRent.data)
  const handleReturn = async () => {
    try {
      dispatch(finishRent({user_dni:dni,vehicle_id:vehicleId,pickup_location_id:pickupLocationId}));
    } catch (error) {
      alert("Error returning vehicle: " + error.message);
    }
  };
  return (
    <Container>
      <GoHomeButton ></GoHomeButton>
      <Title>Return a Vehicle</Title>
      <Input
        type="number"
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Vehicle ID"
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Pickup Location ID"
        value={pickupLocationId}
        onChange={(e) => setPickupLocationId(e.target.value)}
      />
      <Button onClick={handleReturn}>Return Vehicle</Button>
      {returnRent && (
        <div>
          <p>Total time: {returnRent.totalTime} minutes</p>
          <p>Bonus time earned: {returnRent.bonusTime} minutes</p>
        </div>
      )}
    </Container>
  );
};

export default ReturnVehicle;

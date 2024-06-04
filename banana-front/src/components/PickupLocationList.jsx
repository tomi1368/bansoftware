import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPickupLocations } from "../redux/pickupLocationSlice";
import { Container,StyledList,StyledLink } from "./StyledComponents";


const LocationList = () => {
  const dispatch = useDispatch();
  const { pickupLocations, status, error } = useSelector((state) => state.pickupLocations);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPickupLocations());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <Container>Loading...</Container>;
  }

  if (status === "failed") {
    return <Container>{error}</Container>;
  }

  return (
   <StyledList>
      {pickupLocations.map((location) => (
        <StyledLink
          key={location.pickup_location_id}
          to={`/locations/${location.pickup_location_id}`}
        >
          {location.name}
        </StyledLink>
      ))}
    </StyledList>
  );
};

export default LocationList;

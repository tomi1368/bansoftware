import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRents } from "../redux/rentSlice";
import { Container, Input, Button,Title,StyledList,StyleItem } from "./StyledComponents";
import GoHomeButton from "./GoHome";

const RentReport = () => {
  const [dni, setDni] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.rents.rents);

  const handleFetchRentals = () => {
    dispatch(fetchRents({user_dni:dni,createdAt:startDate,endDate}));
  };

  return (
    <Container>
      <GoHomeButton></GoHomeButton>
      <Title>Rent Report</Title>
      <Input
        type="number"
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
      />
      <Input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <Input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <Button onClick={handleFetchRentals}>Fetch Rents</Button>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
        <div>
          <Title style={{fontSize:16}}>Rents for {dni}</Title>
          <Title style={{fontSize:14}}>{`Total time consumed:${data.totalMinutes} minutes`}</Title>
          <StyledList>
            {data.rents.map((rental) => (
              <StyleItem key={rental.id}>
                {rental.startDate} - {rental.endDate}: {rental.totalTime}{" "}
                minutes
              </StyleItem>
            ))}
           </StyledList>
        </div>
      )}
    </Container>
  );
};

export default RentReport;

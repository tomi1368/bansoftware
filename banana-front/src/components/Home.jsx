import { Container, StyledList,StyledLink,Title } from "./StyledComponents"


const Home = () => {
  return (
    <Container>
        <Title>Welcome to Rent a Vehicle</Title>
        <StyledList>
            <StyledLink to={"/locations"}>
                Rent a vehicle
            </StyledLink>
            <StyledLink to={"/return"}>
                Finish vehicle rent 
            </StyledLink>
            <StyledLink to={"/report"}>
              See my reports
            </StyledLink>
        </StyledList>

    </Container>
  )
}

export default Home
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import PickupLocationList from './components/PickupLocationList';
import RentVehicle from './components/RentVehicle';
import ReturnVehicle from './components/ReturnVehicle';
import RentReport from './components/RentReport';
import { Container,Title } from './components/StyledComponents';
import Home from './components/Home';
import PickupLocationVehicles from "./components/PickupLocationVehicles"
const App = () => {
  return (
    <Router>
      <Container>
        <Title style={{fontSize:"2.3em"}}>Vehicle Rent System</Title>
        <Routes>
          <Route path="/rent/:id" element={<RentVehicle />} />
          <Route path="/return" element={<ReturnVehicle />} />
          <Route path="/report" element={<RentReport />} />
          <Route path="/locations"  element={<PickupLocationList />} />
          <Route path='/locations/:id'  element={<PickupLocationVehicles></PickupLocationVehicles>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
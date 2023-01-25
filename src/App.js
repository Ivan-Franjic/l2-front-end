import { BrowserRouter, Routes, Route } from "react-router-dom";
import Vehicles from "./Pages/Vehicles";
import EditVehicle from "./Components/Vehicles/Edit/EditVehicle";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Vehicles />}></Route>
          <Route path="/vehicles/edit/id/:id" element={<EditVehicle />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

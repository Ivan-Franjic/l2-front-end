import { BrowserRouter, Routes, Route } from "react-router-dom";
import Vehicles from "./Pages/Vehicles";
import EditVehicle from "./Components/Vehicles/Edit/EditVehicle";
import CreateVehicle from "./Components/Vehicles/Create/CreateVehicle";
import DeleteVehicle from "./Components/Vehicles/Delete/DeleteVehicle";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Vehicles />}></Route>
          <Route path="/vehicles/edit/id/:id" element={<EditVehicle />}></Route>
          <Route path="/vehicles/create" element={<CreateVehicle />}></Route>
          <Route
            path="/vehicles/delete/id/:id"
            element={<DeleteVehicle />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

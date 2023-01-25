import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Vehicles from "./pages/Vehicles";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>{/* <Route path="/" element={<Vehicles />}></Route> */}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

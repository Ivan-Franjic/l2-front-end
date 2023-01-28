import React from "react";
import VehiclesTable from "../Components/Vehicles/Table/VehiclesTable";
import "./Vehicles.css";

const Vehicles = () => {
  return (
    <>
      <main className="container">
        <div className="wrapper">
          <VehiclesTable />
        </div>
      </main>
    </>
  );
};

export default Vehicles;

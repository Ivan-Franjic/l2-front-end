import React, { useState, useEffect } from "react";
import Table from "../Components/Vehicles/Table/Table";
import VehiclesStore from "../Stores/VehiclesStore";
import { observer } from "mobx-react";
import "./Vehicles.css";

const Vehicles = observer(() => {
  return (
    <>
      <main className="container">
        <div className="wrapper">
          <Table data={VehiclesStore.vehiclemodels} rowsPerPage={4} />
        </div>
      </main>
    </>
  );
});

export default Vehicles;

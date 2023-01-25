import React, { useState, useEffect } from "react";
import VehiclesStore from "../stores/VehiclesStore";
import { observer } from "mobx-react";
import "./Vehicles.css";

const Vehicles = observer(() => {
  // const [vehiclemakes, setVehicleMakes] = useState([]);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "GET",
    heders: myHeaders,
  };

  const url_vehiclemakes =
    "https://api.baasic.com/beta/l2-front-end/resources/VehicleMake/";

  const getVehicleMakes = async () => {
    const res_vehiclemakes = await fetch(url_vehiclemakes, requestOptions);
    const vehiclemakes = await res_vehiclemakes.json();
    VehiclesStore.setVehicleMakes(vehiclemakes.item);
  };

  useEffect(() => {
    getVehicleMakes();
  }, []);

  return (
    <>
      <main className="container">
        <div className="wrapper"></div>
      </main>
    </>
  );
});

export default Vehicles;

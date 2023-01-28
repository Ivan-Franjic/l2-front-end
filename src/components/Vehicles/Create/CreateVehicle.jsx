import React from "react";
import { Link } from "react-router-dom";
import { createVehicle } from "../../../Common/Services/VehiclesService";
import VehiclesStore from "../../../Stores/VehiclesStore";
import "./CreateVehicle.css";

export default function EditVehicle() {
  function Success() {
    document.getElementById("create__formSubmitButton").disabled = true;
    setTimeout(() => {
      document.getElementById("redirect").click();
    }, 1000);
  }

  function Cancel() {
    document.getElementById("create__formCancelButton").disabled = true;
    document.getElementById("redirect").click();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createVehicle(
      VehiclesStore.valuesCreateVehicle.vehiclemodel,
      VehiclesStore.valuesCreateVehicle.vehiclemake
    );
    Success();
  };

  return (
    <>
      <div className="create">
        <div className="create__vehicle">
          <form onSubmit={handleSubmit} className="create__vehicleForm">
            <label htmlFor="vehiclemake">Make</label>
            <select
              className="select"
              id="vehiclemake"
              name="vehiclemake"
              onChange={VehiclesStore.handleChangeCreateVehicle}
              required
            >
              {VehiclesStore.vehiclemakes.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label htmlFor="vehiclemodel">Model</label>
            <input
              type="text"
              id="vehiclemodel"
              name="vehiclemodel"
              onChange={VehiclesStore.handleChangeCreateVehicle}
              required
            />
            <Link id="redirect" to="/" />
            <button
              id="create__formSubmitButton"
              type="submit"
              color="primary"
              className="inputnc"
            >
              Add
            </button>
            <button
              id="create__formCancelButton"
              type="submit"
              color="primary"
              className="inputonc"
              onClick={Cancel}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

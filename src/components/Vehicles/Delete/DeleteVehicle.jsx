import React from "react";
import { Link, useParams } from "react-router-dom";
import { deleteVehicle } from "../../../Common/Services/VehiclesService";
import "./DeleteVehicle.css";

export default function DeleteVehicle() {
  const { id } = useParams();

  function Success() {
    document.getElementById("delete__formSubmitButton").disabled = true;
    setTimeout(() => {
      document.getElementById("redirect").click();
    }, 1000);
  }

  function Cancel() {
    document.getElementById("delete__formCancelButton").disabled = true;
    document.getElementById("redirect").click();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteVehicle(id);
    Success();
  };

  return (
    <>
      <div className="delete">
        <div className="delete__vehicle">
          <form onSubmit={handleSubmit} className="delete__vehicleForm">
            <label>Delete this vehicle?</label>

            <Link id="redirect" to="/" />
            <button
              id="delete__formSubmitButton"
              type="submit"
              color="primary"
              className="inputnc"
            >
              Delete
            </button>
            <button
              id="delete__formCancelButton"
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

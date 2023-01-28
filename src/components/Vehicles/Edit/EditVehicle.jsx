import { React, useEffect } from "react";
import { observer } from "mobx-react";
import { Link, useParams } from "react-router-dom";
import { editVehicle } from "../../../Common/Services/VehiclesService";
import VehiclesStore from "../../../Stores/VehiclesStore";
import "./EditVehicle.css";

const EditVehicle = observer(() => {
  const { id } = useParams();

  function Success() {
    document.getElementById("edit__formSubmitButton").disabled = true;
    setTimeout(() => {
      document.getElementById("redirect").click();
    }, 1000);
  }

  function Cancel() {
    document.getElementById("edit__formCancelButton").disabled = true;
    document.getElementById("redirect").click();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editVehicle(
      id,
      VehiclesStore.valuesEditVehicle.vehiclemodel,
      VehiclesStore.valuesEditVehicle.vehiclemake
    );
    Success();
  };

  useEffect(() => {
    VehiclesStore.handleExistingValues(id);
  }, []);

  return (
    <>
      <div className="edit">
        <div className="edit__vehicle">
          <form onSubmit={handleSubmit} className="edit__vehicleForm">
            <label htmlFor="vehiclemake">Make</label>
            <select
              className="select"
              id="vehiclemake"
              name="vehiclemake"
              value={VehiclesStore.valuesEditVehicle.vehiclemake}
              onChange={VehiclesStore.handleChangeEditVehicle}
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
              value={VehiclesStore.valuesEditVehicle.vehiclemodel}
              onChange={VehiclesStore.handleChangeEditVehicle}
              required
            />
            <Link id="redirect" to="/" />
            <button
              id="edit__formSubmitButton"
              type="submit"
              color="primary"
              className="inputnc"
            >
              Save
            </button>
            <button
              id="edit__formCancelButton"
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
});

export default EditVehicle;

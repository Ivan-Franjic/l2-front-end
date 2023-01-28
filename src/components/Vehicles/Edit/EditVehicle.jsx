import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  editVehicle,
  getVehicleDetails,
} from "../../../Common/Services/VehiclesService";
import VehiclesStore from "../../../Stores/VehiclesStore";
import "./EditVehicle.css";

export default function EditVehicle() {
  const { id } = useParams();
  const [update, setUpdate] = useState(1);

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

  const [values, setValues] = useState({
    vehiclemodel: "",
    vehiclemake: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editVehicle(id, values.vehiclemodel, values.vehiclemake);
    Success();
  };

  useEffect(() => {
    getVehicleDetails(id).then((data) => {
      handleExistingValues(data);
    });
  }, []);

  const handleExistingValues = (data) => {
    values.vehiclemake = data.makeid;
    values.vehiclemodel = data.name;
    setUpdate(update + 1);
  };

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
              value={values.vehiclemake}
              onChange={handleChange}
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
              value={values.vehiclemodel}
              onChange={handleChange}
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
}

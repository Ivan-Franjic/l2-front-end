import { React, useState, useEffect } from "react";
import UseEditForm from "./UseEditForm";
import { Link, useParams } from "react-router-dom";
// import './EditVehicle.css'

export default function EditVehicle() {
  const { id } = useParams();
  const [update, setUpdate] = useState(1);
  const [test, setTest] = useState([]);

  function Success() {
    document.getElementById("submitButton").disabled = true;
    setTimeout(() => {
      document.getElementById("redirect").click();
    }, 2000);
  }

  function Cancel() {
    document.getElementById("cancelButton").disabled = true;
    document.getElementById("redirect").click();
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  useEffect(() => {
    fetch("https://api.baasic.com/beta/l2-front-end/resources/VehicleMake/", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => setTest(data));

    fetch(
      "https://api.baasic.com/beta/l2-front-end/resources/VehicleModel/" + id,
      {
        method: "GET",
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        handleExistingValues(data);
      });
  }, []);

  const { handleChange, values, handleSubmit } = UseEditForm(id, Success);

  const handleExistingValues = (data) => {
    values.vehiclemake = data.id;
    values.vehiclemodel = data.name;
    setUpdate(update + 1);
  };
  console.log(test);
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="vehiclemake">Make:</label>
        <select
          className="select"
          id="vehiclemake"
          name="vehiclemake"
          value={values.vehiclemake}
          onChange={handleChange}
        >
          {test.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select> */}
        <label htmlFor="vehiclemodel">Model:</label>
        <input
          type="text"
          id="vehiclemodel"
          name="vehiclemodel"
          value={values.vehiclemodel}
          onChange={handleChange}
        />
        <Link id="redirect" to="/" />
        <button
          id="submitButton"
          type="submit"
          color="primary"
          className="inputnc"
        >
          Spremi
        </button>
        <button
          id="cancelButton"
          type="submit"
          color="primary"
          className="inputonc"
          onClick={Cancel}
        >
          Odustani
        </button>
      </form>
    </>
  );
}

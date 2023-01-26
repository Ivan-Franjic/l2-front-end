import React from "react";
import useDeleteForm from "./useDeleteForm";
import { Link, useParams } from "react-router-dom";
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

  const { handleSubmit } = useDeleteForm(id, Success);

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

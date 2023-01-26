import { useState } from "react";

const useEditForm = (id, Success) => {
  const [values, setValues] = useState({
    vehiclemodel: "",
    makeid: "",
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

    let requestOptions = {};
    requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: values.vehiclemodel,
        makeid: values.vehiclemake,
      }),
    };

    fetch(
      "https://api.baasic.com/beta/l2-front-end/resources/VehicleModel/" + id,
      requestOptions
    );
    Success();
  };

  return { handleChange, values, handleSubmit };
};

export default useEditForm;

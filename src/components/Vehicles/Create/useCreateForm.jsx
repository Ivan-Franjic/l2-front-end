import { useState } from "react";

const useCreateForm = (Success) => {
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

    let requestOptions = {};
    requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.vehiclemodel,
        makeid: values.vehiclemake,
      }),
    };

    fetch(
      "https://api.baasic.com/beta/l2-front-end/resources/VehicleModel/",
      requestOptions
    );
    Success();
  };
  return { handleChange, handleSubmit };
};

export default useCreateForm;

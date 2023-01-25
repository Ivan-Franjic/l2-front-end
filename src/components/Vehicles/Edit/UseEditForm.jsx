import { useState } from "react";

const UseEditForm = (id, Success) => {
  const [values, setValues] = useState({
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
      method: "PUT",
      headers: { "Content-Type": "aplication/json" },
      body: JSON.stringify({
        id: id,
        name: values.vehiclemake,
      }),
    };

    fetch(
      "https://api.baasic.com/beta/l2-front-end/resources/VehicleModel/",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        Success(data.message);
      });
  };

  return { handleChange, values, handleSubmit };
};

export default UseEditForm;

const useDeleteForm = (id, Success) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    let requestOptions = {};
    requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      "https://api.baasic.com/beta/l2-front-end/resources/VehicleModel/" + id,
      requestOptions
    );
    Success();
  };
  return { handleSubmit };
};

export default useDeleteForm;

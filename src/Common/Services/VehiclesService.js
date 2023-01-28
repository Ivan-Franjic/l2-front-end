const requestOptions = {
  method: "GET",
  heders: { "Content-Type": "application/json" },
};

const url_vehiclemakes =
  "https://api.baasic.com/beta/l2-front-end/resources/VehicleMake/";

const url_vehiclemodels =
  "https://api.baasic.com/beta/l2-front-end/resources/VehicleModel/";

export const getVehicleMakes = async () => {
  const res_vehiclemakes = await fetch(url_vehiclemakes, requestOptions);
  const vehiclemakes = await res_vehiclemakes.json();
  return vehiclemakes.item;
};

export const getVehicleModels = async () => {
  const res_vehiclemodels = await fetch(url_vehiclemodels, requestOptions);
  const vehiclemodels = await res_vehiclemodels.json();
  return vehiclemodels.item;
};

export const deleteVehicle = (id) => {
  fetch(url_vehiclemodels + id, {
    method: "DELETE",
    heders: { "Content-Type": "application/json" },
  });
};

export const createVehicle = (name, makeid) => {
  fetch(url_vehiclemodels, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, makeid: makeid }),
  });
};

export const getVehicleDetails = (id) => {
  return fetch(url_vehiclemodels + id, requestOptions).then((response) =>
    response.json()
  );
};

export const editVehicle = (id, name, makeid) => {
  fetch(url_vehiclemodels + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, name: name, makeid: makeid }),
  });
};

import { makeAutoObservable } from "mobx";
import {
  getVehicleDetails,
  getVehicleMakes,
  getVehicleModels,
} from "../Common/Services/VehiclesService";

class VehiclesStore {
  activePage = 1;
  rowsPerPage = 4;
  vehiclemakes = [];
  vehiclemodels = [];
  vehicles = [];
  // sort = { order: "asc", orderBy: "id" };
  columns = [
    { accessor: "name", label: "Name" },
    { accessor: "model", label: "Model" },
  ];

  valuesCreateVehicle = { vehiclemodel: "", vehiclemake: "" };
  // valuesEditVehicle = { vehiclemodel: "", vehiclemake: "" };
  // update = 1;

  constructor() {
    makeAutoObservable(this);
  }

  getVehiclesData = () => {
    const vehiclesArray = [];
    getVehicleMakes()
      .then((vehiclemakes) => (this.vehiclemakes = vehiclemakes))
      .then(() =>
        getVehicleModels()
          .then((vehiclemodels) => (this.vehiclemodels = vehiclemodels))
          .then(() =>
            this.vehiclemodels.map((s1) => {
              vehiclesArray.push({
                id: s1.id,
                name: this.vehiclemakes.find(
                  (s2) => s2.id.toString() === s1.makeid
                ).name,
                model: s1.name,
              });
              this.setVehicles(vehiclesArray);
            })
          )
      );
  };

  handleChangeCreateVehicle = (e) => {
    const { name, value } = e.target;
    this.setValuesCreateVehicle({
      ...this.valuesCreateVehicle,
      [name]: value,
    });
  };

  // handleChangeEditVehicle = (e) => {
  //   const { name, value } = e.target;
  //   this.setValuesEditVehicle({
  //     ...this.valuesEditVehicle,
  //     [name]: value,
  //   });
  // };

  setVehicles = (vehicles) => {
    this.vehicles = vehicles;
  };

  setActivePage = (activePage) => {
    this.activePage = activePage;
  };

  setrowsPerPage = (rowsPerPage) => {
    this.rowsPerPage = rowsPerPage;
  };

  // setSort = (sort) => {
  //   this.sort = sort;
  // };

  // setUpdate = (update) => {
  //   this.update = update;
  // };

  setValuesCreateVehicle = (valuesCreateVehicle) => {
    this.valuesCreateVehicle = valuesCreateVehicle;
  };

  // setValuesEditVehicle = (valuesEditVehicle) => {
  //   this.valuesEditVehicle = valuesEditVehicle;
  // };
}

export default new VehiclesStore();

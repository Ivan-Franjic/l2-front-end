import { makeAutoObservable, runInAction } from "mobx";
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
  valuesCreateVehicle = { vehiclemodel: "", vehiclemake: "" };
  valuesEditVehicle = { vehiclemodel: "", vehiclemake: "" };
  update = 1;
  columns = [
    { accessor: "name", label: "Name" },
    { accessor: "model", label: "Model" },
  ];

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

  handleChangeEditVehicle = (e) => {
    const { name, value } = e.target;
    this.setValuesEditVehicle({
      ...this.valuesEditVehicle,
      [name]: value,
    });
  };

  handleExistingValues = (id) => {
    getVehicleDetails(id).then((data) => {
      runInAction(() => {
        this.valuesEditVehicle.vehiclemake = data.makeid;
        this.valuesEditVehicle.vehiclemodel = data.name;
        this.setUpdate(this.update + 1);
      });
    });
  };

  setActivePage = (activePage) => {
    this.activePage = activePage;
  };

  setrowsPerPage = (rowsPerPage) => {
    this.rowsPerPage = rowsPerPage;
  };

  setVehicles = (vehicles) => {
    this.vehicles = vehicles;
  };

  setValuesCreateVehicle = (valuesCreateVehicle) => {
    this.valuesCreateVehicle = valuesCreateVehicle;
  };

  setValuesEditVehicle = (valuesEditVehicle) => {
    this.valuesEditVehicle = valuesEditVehicle;
  };

  setUpdate = (update) => {
    this.update = update;
  };
}

export default new VehiclesStore();

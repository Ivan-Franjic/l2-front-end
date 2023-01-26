import { makeAutoObservable } from "mobx";

class VehiclesStore {
  vehiclemakes = [];
  vehiclemodels = [];
  vehicles = [];

  constructor() {
    makeAutoObservable(this);
  }

  setVehicleMakes = (vehiclemakes) => {
    this.vehiclemakes = vehiclemakes;
  };

  setVehicleModels = (vehiclemodels) => {
    this.vehiclemodels = vehiclemodels;
  };

  setVehicles = (vehicles) => {
    this.vehicles = vehicles;
  };
}

export default new VehiclesStore();

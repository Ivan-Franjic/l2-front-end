import { makeAutoObservable } from "mobx";

class VehiclesStore {
  vehiclemakes = [];
  vehiclemodels = [];

  constructor() {
    makeAutoObservable(this);
  }

  setVehicleMakes = (vehiclemakes) => {
    this.vehiclemakes = vehiclemakes;
  };

  setVehicleModels = (vehiclemodels) => {
    this.vehiclemodels = vehiclemodels;
  };
}

export default new VehiclesStore();

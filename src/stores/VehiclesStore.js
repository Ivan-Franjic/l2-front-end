import { makeAutoObservable } from "mobx";

class VehiclesStore {
  vehiclemakes = [];

  constructor() {
    makeAutoObservable(this);
  }

  setVehicleMakes = (vehiclemakes) => {
    this.vehiclemakes = vehiclemakes;
  };
}

export default new VehiclesStore();

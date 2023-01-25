import { makeAutoObservable } from "mobx";

class TableStore {
  page = 1;
  slice = [];
  tableRange = [];

  constructor() {
    makeAutoObservable(this);
  }

  setPage = (page) => {
    this.page = page;
  };

  setSlice = (slice) => {
    this.slice = slice;
  };

  setTableRange = (tableRange) => {
    this.tableRange = tableRange;
  };
}

export default new TableStore();

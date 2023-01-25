import { useState, useEffect } from "react";
import TableStore from "../stores/TableStore";

const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const useTable = (data, page, rowsPerPage) => {
  // const [tableRange, setTableRange] = useState([]);
  // const [slice, setSlice] = useState([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    TableStore.setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    TableStore.setSlice([...slice]);
  }, [data, TableStore.setTableRange, page, TableStore.setSlice]);

  return { slice: TableStore.slice, range: TableStore.tableRange };
};

export default useTable;

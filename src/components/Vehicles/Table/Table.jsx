import React, { useEffect, useState, useMemo } from "react";
import { sortRows, filterRows, paginateRows } from "./helpers";
import { observer } from "mobx-react";
import "./Table.css";
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import TableFooter from "./TableFooter";
import TableStore from "../../../Stores/TableStore";
import VehiclesStore from "../../../Stores/VehiclesStore";
import { Link } from "react-router-dom";

const Table = ({ data }) => {
  const [activePage, setActivePage] = useState(1);
  const columns = [
    { accessor: "name", label: "Name" },
    { accessor: "model", label: "Model" },
  ];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });
  const rowsPerPage = 4;

  const filteredRows = useMemo(
    () => filterRows(data, filters),
    [data, filters]
  );
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);
  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "GET",
    heders: myHeaders,
  };

  const url_vehiclemakes =
    "https://api.baasic.com/beta/l2-front-end/resources/VehicleMake/";

  const url_vehiclemodels =
    "https://api.baasic.com/beta/l2-front-end/resources/VehicleModel/";

  const getVehicleMakes = async () => {
    const res_vehiclemakes = await fetch(url_vehiclemakes, requestOptions);
    const vehiclemakes = await res_vehiclemakes.json();
    VehiclesStore.setVehicleMakes(vehiclemakes.item);
  };

  const getVehicleModels = async () => {
    const res_vehiclemodels = await fetch(url_vehiclemodels, requestOptions);
    const vehiclemodels = await res_vehiclemodels.json();
    VehiclesStore.setVehicleModels(vehiclemodels.item);
  };

  const handleSort = (accessor) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
  };

  const createVehiclesArray = () => {
    const vehiclesArray = [];
    VehiclesStore.vehiclemodels.map((s1) => {
      vehiclesArray.push({
        id: s1.id,
        name: VehiclesStore.vehiclemakes.find(
          (s2) => s2.id.toString() === s1.makeid
        ).name,
        model: s1.name,
      });
    });
    VehiclesStore.setVehicles(vehiclesArray);
  };

  useEffect(() => {
    getVehicleMakes();
    getVehicleModels();
    createVehiclesArray();
  }, []);

  return (
    <>
      <table className="table">
        <thead className="table__header">
          <tr>
            <th className="table__headerRow">#</th>
            {columns.map((column) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === "asc") {
                    return "⬆️";
                  }
                  return "⬇️";
                } else {
                  return "⇅";
                }
              };
              return (
                <th className="table__headerRow" key={column.accessor}>
                  <span>{column.label}</span>
                  <button onClick={() => handleSort(column.accessor)}>
                    {sortIcon()}
                  </button>
                </th>
              );
            })}
            <th className="table__headerRow">Edit</th>
            <th className="table__headerRow">Delete</th>
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row, index) => (
            <>
              <tr className="table__items" key={row.id}>
                <td className="table__itemsCell">{index + 1}.</td>
                <td className="table__itemsCell">{row.name}</td>
                <td className="table__itemsCell">{row.model}</td>
                <td className="table__itemsCell">
                  <Link to={"/vehicles/edit/id/" + row.id}>
                    <MdEdit className="table__iconEdit" />
                  </Link>
                </td>
                <td className="table__itemsCell">
                  <Link to={"/vehicles/delete/id/" + row.id}>
                    <BsFillTrashFill className="table__iconDelete" />
                  </Link>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <TableFooter
        activePage={activePage}
        count={count}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </>
  );
};

export default Table;

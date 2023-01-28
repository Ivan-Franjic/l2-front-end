import React, { useEffect, useState, useMemo } from "react";
import { sortRows, filterRows, paginateRows } from "../../../Common/helpers";
import { observer } from "mobx-react";
import VehiclesStore from "../../../Stores/VehiclesStore";
import TableFooter from "./TableFooter";
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import "./VehiclesTable.css";

import { Link } from "react-router-dom";

const VehiclesTable = observer(() => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });

  const filteredRows = useMemo(
    () => filterRows(VehiclesStore.vehicles, filters),
    [VehiclesStore.vehicles, filters]
  );

  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );

  const calculatedRows = paginateRows(
    sortedRows,
    VehiclesStore.activePage,
    VehiclesStore.rowsPerPage
  );

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / VehiclesStore.rowsPerPage);

  const handleSort = (accessor) => {
    VehiclesStore.setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
  };

  const handleSearch = (value, accessor) => {
    VehiclesStore.setActivePage(1);
    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  useEffect(() => {
    VehiclesStore.getVehiclesData();
  }, []);

  return (
    <>
      <Link to={"/vehicles/create"}>
        <button className="addVehicleButton">+ Add vehicle</button>
      </Link>

      <table className="table">
        <thead className="table__header">
          <tr>
            <th className="table__headerRow">#</th>
            {VehiclesStore.columns.map((column) => {
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
          <tr>
            <th></th>
            {VehiclesStore.columns.map((column) => {
              return (
                <th>
                  <input
                    key={`${column.accessor}-search`}
                    type="search"
                    placeholder={`Filter by ${column.label.toLowerCase()}`}
                    value={filters[column.accessor]}
                    onChange={(event) =>
                      handleSearch(event.target.value, column.accessor)
                    }
                  />
                </th>
              );
            })}
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
        activePage={VehiclesStore.activePage}
        count={count}
        rowsPerPage={VehiclesStore.rowsPerPage}
        totalPages={totalPages}
        setActivePage={VehiclesStore.setActivePage}
      />
    </>
  );
});

export default VehiclesTable;

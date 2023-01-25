import React, { useEffect } from "react";
import { observer } from "mobx-react";
import useTable from "./UseTable";
import "./Table.css";
import { MdEdit } from "react-icons/md";
import TableFooter from "./TableFooter";
import TableStore from "../../../Stores/TableStore";
import VehiclesStore from "../../../Stores/VehiclesStore";
import { Link } from "react-router-dom";

const Table = observer(({ data, rowsPerPage }) => {
  const { slice, range } = useTable(data, TableStore.page, rowsPerPage);
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

  useEffect(() => {
    getVehicleMakes();
    getVehicleModels();
  }, []);

  return (
    <>
      <table className="table">
        <thead className="tableRowHeader">
          <tr>
            <th className="tableHeader">#</th>
            <th className="tableHeader">Make</th>
            <th className="tableHeader">Model</th>
            <th className="tableHeader">Edit</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((row, index) =>
            VehiclesStore.vehiclemakes.map((row2) =>
              row2.id === row.makeid ? (
                <>
                  <tr className="tableRowItems" key={row.id}>
                    <td className="tableCell">{index + 1}.</td>
                    <td className="tableCell">{row2.name}</td>
                    <td className="tableCell">{row.name}</td>
                    <td className="tableCell">
                      <Link to={"/vehicles/edit/id/" + row.id}>
                        <MdEdit />
                      </Link>
                    </td>
                  </tr>
                </>
              ) : (
                ""
              )
            )
          )}
        </tbody>
      </table>
      <TableFooter
        range={range}
        slice={slice}
        setPage={TableStore.setPage}
        page={TableStore.page}
      />
    </>
  );
});

export default Table;

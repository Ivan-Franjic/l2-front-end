import React, { useState } from "react";
import { observer } from "mobx-react";
import useTable from "./useTable";
import "./Table.css";
import TableFooter from "./TableFooter";
import TableStore from "../stores/TableStore";

const Table = observer(({ data, rowsPerPage }) => {
  const { slice, range } = useTable(data, TableStore.page, rowsPerPage);
  return (
    <>
      <table className="table">
        <thead className="tableRowHeader">
          <tr>
            <th className="tableHeader">#</th>
            <th className="tableHeader">Make</th>
            <th className="tableHeader">Edit</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((row, index) => (
            <tr className="tableRowItems" key={row.id}>
              <td className="tableCell">{index + 1}.</td>
              <td className="tableCell">{row.name}</td>
              <td className="tableCell"></td>
            </tr>
          ))}
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

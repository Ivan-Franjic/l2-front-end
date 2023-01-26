import React from "react";
import "./TableFooter.css";
const TableFooter = ({
  activePage,
  count,
  rowsPerPage,
  totalPages,
  setActivePage,
}) => {
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

  return (
    <>
      <div className="table__footer">
        <button
          className="table__footerButton"
          disabled={activePage === 1}
          onClick={() => setActivePage(1)}
        >
          ⏮️
        </button>
        <button
          className="table__footerButton"
          disabled={activePage === 1}
          onClick={() => setActivePage(activePage - 1)}
        >
          ⬅️
        </button>
        <button
          className="table__footerButton"
          disabled={activePage === totalPages}
          onClick={() => setActivePage(activePage + 1)}
        >
          ➡️
        </button>
        <button
          className="table__footerButton"
          disabled={activePage === totalPages}
          onClick={() => setActivePage(totalPages)}
        >
          ⏭️
        </button>
      </div>
      <p>
        Page {activePage} of {totalPages}
      </p>
      <p>
        Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
      </p>
    </>
  );
};

export default TableFooter;

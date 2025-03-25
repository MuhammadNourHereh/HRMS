import React from "react";
import "../styles/DataTable.css";

const DataTable = ({
  //default values so you can change the results per page according to how many you want
  columns = [],
  data = [],
  currentPage = 1,
  totalPages = 1,
  totalResults = 0,
  resultsPerPage = 10,
  onPageChange = () => {},
  loading = false,
  emptyMessage = "No data available",
}) => {
  if (loading) {
    return <div className="table-loading">Loading...</div>;
  }

  if (!data.length) {
    return <div className="table-empty">{emptyMessage}</div>;
  }

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={column.className || ""}>
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={column.className || ""}>
                  {column.renderCell
                    ? column.renderCell(row)
                    : row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="table-pagination">
        <div className="pagination-info">
          Showing {(currentPage - 1) * resultsPerPage + 1} to{" "}
          {Math.min(currentPage * resultsPerPage, totalResults)} of{" "}
          {totalResults} results
        </div>
        <div className="pagination-controls">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="pagination-button"
            aria-label="Previous page"
          >
            <span aria-hidden="true">&lt;</span>
          </button>

          {/*  page buttons */}
          {/* took it from Bootstrap pagination components */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={i}
                onClick={() => onPageChange(pageNum)}
                className={`pagination-button ${
                  pageNum === currentPage ? "active" : ""
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="pagination-button"
            aria-label="Next page"
          >
            <span aria-hidden="true">&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

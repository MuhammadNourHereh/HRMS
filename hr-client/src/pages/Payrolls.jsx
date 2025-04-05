// src/components/Payrolls.js
import DataTable from '../components/DataTable';
import usePayrolls from '../hooks/usePayrolls';


const Payrolls = () => {
  const {
    navigateHome,
    navigateApprove,
    columns,
    payrollsLoading,
    getPaginatedData,
    displayPagination,
    handlePageChange,
    payrollsError,
  } = usePayrolls();

  return (
    <div className='column container2 spread'>
      <div className="container margin-left">
        <div className="card-header">
          <h3>Payroll Management</h3>
          {payrollsError && (
            <div className="alert alert-warning">
              Server unavailable - Displaying demo data
            </div>
          )}
        </div>
        <div className="card-body">
          <DataTable
            columns={columns}
            data={getPaginatedData()}
            loading={payrollsLoading}
            currentPage={displayPagination.currentPage}
            totalPages={displayPagination.lastPage}
            totalResults={displayPagination.total}
            resultsPerPage={displayPagination.perPage}
            onPageChange={handlePageChange}
            emptyMessage={payrollsError ? "Demo data unavailable" : "No payroll records found"}
          />
        </div>
      </div>
      <div className="container margin-left spread">
        <button
          className='btn-btn'
          onClick={navigateHome}
        >
          Back to home
        </button>
        <button
          className='btn-btn'
          onClick={navigateApprove}
          disabled={payrollsError}
        >
          Check payrolls
        </button>
      </div>
    </div>
  );
};

export default Payrolls;
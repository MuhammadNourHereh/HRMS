import React, { useState } from 'react'
import DataTable from '../components/DataTable'

const Payrolls = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    // INITAILIZING DATA FOR THE PAGINATION
    const [paginationData, setPaginationData] = useState({
      current_page: 1,
      last_page: 1,
      total: 0,
      per_page: 10
    });
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= paginationData.last_page) {
          setPaginationData(prev => ({ ...prev, current_page: newPage }));
        }
      };
      const columns = [
        { 
          field: 'name',
          headerName: 'Employee', 
          renderCell: (row) => (
            <div className="employee-cell">
              <div className="employee-avatar">
                {getInitials(row.name)}
              </div>
              <div>{row.name}</div>
            </div>
          )
        },
        { field: 'gender', headerName: 'Gender' },
        { field: 'department', headerName: 'Department' },
        { 
          field: 'status', 
          headerName: 'Status',
          className: 'status-cell', 
          renderCell: (row) => (
            <span className={`status-badge status-${row.status.toLowerCase()}`}>
              {row.status}
            </span>
          )
        },
        { 
          field: 'contact', 
          headerName: 'Contact',
          renderCell: (row) => (
            <div>
              <div>{row.email}</div>
              <div>{row.phone}</div>
            </div>
          )
        },
        { 
          field: 'actions', 
          headerName: 'Actions',
          renderCell: (row) => (
            <div className="actions-cell">
              <button 
                className="action-button"
                onClick={() => handleView(row)}
                title="View Details"
              >
                <ViewIcon />
              </button>
              <button 
                className="action-button edit-button" 
                onClick={() => handleEdit(row.id)}
                title="Edit"
              >
                <EditIcon />
              </button>
              <button 
                className="action-button delete-button" 
                onClick={() => handleDelete(row.id)}
                title="Delete"
              >
                <DeleteIcon />
              </button>
            </div>
          )
        },
      ];
    return (
        <div className="card">
          <DataTable 
            columns={columns}
            data={employees}
            loading={loading}
            currentPage={paginationData.current_page}
            totalPages={paginationData.last_page}
            totalResults={paginationData.total}
            resultsPerPage={paginationData.per_page}
            onPageChange={handlePageChange}
            emptyMessage="No employees found"
          />
        </div>
    )
}

export default Payrolls
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';
import DeleteEmployeeModal from '../components/DeleteEmployeeModal';

const ViewIcon = () => <i className="fas fa-eye"></i>;
const EditIcon = () => <i className="fas fa-edit"></i>;
const DeleteIcon = () => <i className="fas fa-trash"></i>;

function Employees() {
  const {
    employees,
    loading,
    pagination,
    selectedEmployee,
    modalOpen,
    fetchEmployees,
    handlePageChange,
    viewEmployeeDetails,
    closeModal,
    deleteEmployee,
    navigate
  } = useContext(AppContext);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    fetchEmployees(pagination.current_page);
  }, []);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const handleShowDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteModalOpen(true);
  };

  

  const handleEditEmployee = (employeeId) => {
    navigate(`/employees/edit/${employeeId}`);
  };

  const columns = [
    { 
      field: 'name',
      headerName: 'Employee', 
      renderCell: (row) => (
        <div className="employee-cell">
          <div className="employee-avatar">
            {getInitials(row.first_name, row.last_name)}
          </div>
          <div>{`${row.first_name} ${row.last_name}`}</div>
        </div>
      )
    },
    { field: 'gender', headerName: 'Gender' },
    { 
      field: 'department', 
      headerName: 'Department',
      renderCell: (row) => <div>{row.department?.department_name || 'N/A'}</div>
    },
    { 
      field: 'position', 
      headerName: 'Position',
      renderCell: (row) => <div>{row.position?.position_name || 'N/A'}</div>
    },
    { 
      field: 'role', 
      headerName: 'Role',
      className: 'status-cell', 
      renderCell: (row) => (
        <span className={`status-badge status-${row.role.toLowerCase()}`}>
          {row.role}
        </span>
      )
    },
    { 
      field: 'contact', 
      headerName: 'Contact',
      renderCell: (row) => (
        <div>
          <div>{row.email}</div>
          <div>{row.phone_number}</div>
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
            onClick={() => viewEmployeeDetails(row)}
            title="View Details"
          >
            <ViewIcon />
          </button>
          <button 
            className="action-button edit-button" 
            onClick={() => handleEditEmployee(row.id)}
            title="Edit"
          >
            <EditIcon />
          </button>
          <button 
            className="action-button delete-button" 
            onClick={() => handleShowDeleteModal(row)}
            title="Delete"
          >
            <DeleteIcon />
          </button>
        </div>
      )
    },
  ];

  return (
    <div className="container margin-right">
      <header>
        <h1>Employee Directory</h1>
      </header>
      
      <main>
        <div className="card">
          <DataTable 
            columns={columns}
            data={employees}
            loading={loading}
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            totalResults={pagination.total}
            resultsPerPage={pagination.per_page}
            onPageChange={handlePageChange}
            emptyMessage="No employees found"
          />
        </div>

        {/* Employee Details Modal */}
        <Modal 
          isOpen={modalOpen} 
          onClose={closeModal}
          title={selectedEmployee ? `${selectedEmployee.first_name} ${selectedEmployee.last_name} Details` : 'Employee Details'}
          fullscreen={true}
        >
          {selectedEmployee && (
            <div className="employee-details">
              <div className="detail-group">
                <div className="detail-avatar">
                  {getInitials(selectedEmployee.first_name, selectedEmployee.last_name)}
                </div>
                <h3>{`${selectedEmployee.first_name} ${selectedEmployee.last_name}`}</h3>
                <span className={`status-badge status-${selectedEmployee.role.toLowerCase()}`}>
                  {selectedEmployee.role}
                </span>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Department</div>
                <div className="detail-value">{selectedEmployee.department?.department_name || 'N/A'}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Position</div>
                <div className="detail-value">{selectedEmployee.position?.position_name || 'N/A'}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Email</div>
                <div className="detail-value">{selectedEmployee.email}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Phone</div>
                <div className="detail-value">{selectedEmployee.phone_number}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Address</div>
                <div className="detail-value">{selectedEmployee.address}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Date of Birth</div>
                <div className="detail-value">
                  {new Date(selectedEmployee.date_of_birth).toLocaleDateString()}
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Salary</div>
                <div className="detail-value">${selectedEmployee.salary}</div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="button button-secondary" 
                  onClick={closeModal}
                >
                  Close
                </button>
                <button 
                  className="button button-primary"
                  onClick={() => handleEditEmployee(selectedEmployee.id)}
                >
                  Edit Employee
                </button>
              </div>
            </div>
          )}
        </Modal>
        
        {/* Delete Confirmation Modal */}
        <DeleteEmployeeModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={deleteEmployee}
          employee={employeeToDelete}
        />
      </main>
    </div>
  );
}

export default Employees;
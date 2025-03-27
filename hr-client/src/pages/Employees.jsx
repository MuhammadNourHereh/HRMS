import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';
import DeleteEmployeeModal from '../components/DeleteEmployeeModal';
import EditEmployeeModal from '../components/EditEmployeeModal';
import ViewEmployeeContent from '../components/ViewEmployeeContent';
import '../styles/Employees.css';

const ViewIcon = () => <i className="fas fa-eye"></i>;
const EditIcon = () => <i className="fas fa-edit"></i>;
const DeleteIcon = () => <i className="fas fa-trash"></i>;

function Employees() {
  const {
    employees,
    loading,
    pagination,
    fetchEmployees,
    handlePageChange
  } = useContext(AppContext);

  // Component state for modals
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees(pagination.current_page);
  }, []);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  // Modal handlers
  const handleOpenViewModal = (employee) => {
    setSelectedEmployee(employee);
    setViewModalOpen(true);
  };
  
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
  };
  
  const handleOpenEditModal = (employee = null) => {
    setSelectedEmployee(employee);
    setEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };
  
  const handleOpenDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setDeleteModalOpen(true);
  };
  
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  
  // Handle edit/delete success
  const handleEditSuccess = () => {
    fetchEmployees(pagination.current_page);
  };
  
  const handleDeleteSuccess = () => {
    fetchEmployees(pagination.current_page);
  };
  
  // Handle transition from view to edit
  const handleViewToEdit = () => {
    setViewModalOpen(false);
    setEditModalOpen(true);
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
            className="action-button view-button" 
            onClick={() => handleOpenViewModal(row)}
            title="View"
          >
            <ViewIcon />
          </button>
          <button 
            className="action-button edit-button" 
            onClick={() => handleOpenEditModal(row)}
            title="Edit"
          >
            <EditIcon />
          </button>
          <button 
            className="action-button" 
            onClick={() => handleOpenDeleteModal(row)}
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
      <header className="page-header">
        <h1>Employee Directory</h1>
        <button 
          className="btn-btn"
          onClick={() => handleOpenEditModal(null)}
        >
          Add Employee
        </button>
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

        {/* View Employee Modal */}
        <Modal 
          isOpen={viewModalOpen}
          onClose={handleCloseViewModal}
          title="Employee Details"
          fullscreen={false}
        >
          {selectedEmployee && (
            <ViewEmployeeContent 
              employee={selectedEmployee} 
              onEdit={handleViewToEdit}
            />
          )}
        </Modal>
        
        {/* Edit Employee Modal */}
        <EditEmployeeModal 
          isOpen={editModalOpen}
          onClose={handleCloseEditModal}
          employee={selectedEmployee}
          onSuccess={handleEditSuccess}
        />
        
        {/* Delete Employee Modal */}
        <DeleteEmployeeModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          employee={selectedEmployee}
          onDelete={handleDeleteSuccess}
        />
      </main>
    </div>
  );
}

export default Employees;
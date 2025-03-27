import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import DataTable from '../components/DataTable';
import ViewCycleDetailsModal from '../components/ViewCycleDetailsModal';
import EditReviewFormModal from '../components/EditReviewFormModal';
import DeleteReviewModal from '../components/DeleteReviewModal';
import '../styles/DataTable.css';
import '../styles/ReviewCycles.css';
import { Link } from 'react-router-dom';

// Icons
const ViewIcon = () => <i className="fas fa-eye"></i>;
const EditIcon = () => <i className="fas fa-edit"></i>;
const DeleteIcon = () => <i className="fas fa-trash"></i>;

function ReviewCycles() {
  const {
    reviewCycles,
    reviewCycleLoading,
    reviewCyclePagination,
    fetchReviewCycles,
    handleReviewCyclePageChange,
    fetchEmployees
  } = useContext(AppContext);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState(null);

  useEffect(() => {
    fetchReviewCycles(reviewCyclePagination.current_page);
    // Fetch employees for the HR dropdown in the form
    fetchEmployees();
  }, []);

  // Action handlers
  const handleViewCycle = (cycle) => {
    setSelectedCycle(cycle);
    setViewModalOpen(true);
  };
  
  const handleAddEditCycle = (cycle = null) => {
    setSelectedCycle(cycle);
    setFormModalOpen(true);
  };
  
  const handleDeleteCycle = (cycle) => {
    setSelectedCycle(cycle);
    setDeleteModalOpen(true);
  };

  // Close handlers
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedCycle(null);
  };

  const handleCloseFormModal = () => {
    setFormModalOpen(false);
    setSelectedCycle(null);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedCycle(null);
  };

  // Table columns
  const columns = [
    { 
      field: 'cycle_name',
      headerName: 'Cycle Name', 
      renderCell: (row) => (
        <div className="cycle-cell">
          <div className="cycle-avatar">
            <i className="far fa-calendar-alt"></i>
          </div>
          <div>{row.cycle_name}</div>
        </div>
      )
    },
    { 
      field: 'period', 
      headerName: 'Period',
      renderCell: (row) => (
        <div>{`${new Date(row.start_date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })} to ${new Date(row.end_date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}`}</div>
      )
    },
    {
      field: 'hr',
      headerName: 'HR Manager',
      renderCell: (row) => (
        <div>{row.hr?.first_name} {row.hr?.last_name}</div>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      className: 'status-cell',
      renderCell: (row) => {
        const today = new Date();
        const startDate = new Date(row.start_date);
        const endDate = new Date(row.end_date);
        
        let status = 'Upcoming';
        let statusClass = 'upcoming';
        
        if (today >= startDate && today <= endDate) {
          status = 'Active';
          statusClass = 'active';
        } else if (today > endDate) {
          status = 'Completed';
          statusClass = 'completed';
        }
        
        return (
          <span className={`status-badge status-${statusClass}`}>
            {status}
          </span>
        );
      }
    },
    { 
      field: 'actions', 
      headerName: 'Actions',
      renderCell: (row) => (
        <div className="actions-cell">
          <button 
            className="action-button view-button" 
            onClick={() => handleViewCycle(row)}
            title="View Performance Reviews"
          >
            <ViewIcon />
          </button>
          <button 
            className="action-button edit-button" 
            onClick={() => handleAddEditCycle(row)}
            title="Edit Cycle"
          >
            <EditIcon />
          </button>
          <button 
            className="action-button delete-button" 
            onClick={() => handleDeleteCycle(row)}
            title="Delete Cycle"
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
        <h1>Performance Management</h1>
        <button 
          className="btn-btn"
          onClick={() => handleAddEditCycle(null)}
        >
          <i className="fas fa-plus"></i> New Review Cycle
        </button>
      </header>
      
      <main>
        {/* Tab Navigation */}
        <div className="tab-navigation">
        <Link to="/performance-reviews"> <button className="tab-button">Performance Reviews</button></Link>
          <button className="tab-button active">Review Cycles</button>
          <button className="tab-button">Goals</button>
          <button className="tab-button">Feedback</button>
        </div>
        
        <div className="card">
          <DataTable 
            columns={columns}
            data={reviewCycles}
            loading={reviewCycleLoading}
            currentPage={reviewCyclePagination.current_page}
            totalPages={reviewCyclePagination.last_page}
            totalResults={reviewCyclePagination.total}
            resultsPerPage={reviewCyclePagination.per_page}
            onPageChange={handleReviewCyclePageChange}
            emptyMessage="No review cycles found"
          />
        </div>

        {/* View Review Cycle Details Modal */}
        <ViewCycleDetailsModal 
          isOpen={viewModalOpen}
          onClose={handleCloseViewModal}
          reviewCycle={selectedCycle}
        />
        
        {/* Add/Edit Review Cycle Modal */}
        <EditReviewFormModal
          isOpen={formModalOpen}
          onClose={handleCloseFormModal}
          reviewCycle={selectedCycle}
        />
        
        {/* Delete Review Cycle Modal */}
        <DeleteReviewModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          reviewCycle={selectedCycle}
        />
      </main>
    </div>
  );
}

export default ReviewCycles;
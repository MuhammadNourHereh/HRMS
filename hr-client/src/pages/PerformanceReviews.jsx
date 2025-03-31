import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import DataTable from '../components/DataTable';
import PerformanceReviewFormModal from '../components/PerformanceReviewFormModal';
import DeletePerformanceReviewModal from '../components/DeletePerformanceReviewModal';
import '../styles/DataTable.css';
import '../styles/PerformanceReviews.css';
import { Link } from 'react-router-dom';

// Icons
const EditIcon = () => <i className="fas fa-edit"></i>;
const DeleteIcon = () => <i className="fas fa-trash"></i>;

const PerformanceReviews = () => {
  const {
    allPerformanceReviews,
    performanceReviewsLoading,
    allPerformanceReviewsPagination,
    fetchAllPerformanceReviews,
    handleAllPerformanceReviewsPageChange,
    fetchReviewCycles,
    fetchEmployees
  } = useContext(AppContext);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all necessary data
    fetchAllPerformanceReviews(allPerformanceReviewsPagination.current_page);
    fetchReviewCycles();
    fetchEmployees();
  }, []);
  
  const handleAddEditReview = (review = null) => {
    setSelectedReview(review);
    setFormModalOpen(true);
  };
  
  const handleDeleteReview = (review) => {
    setSelectedReview(review);
    setDeleteModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setFormModalOpen(false);
    setSelectedReview(null);
  };
  
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedReview(null);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Table columns
  const columns = [
    
    { 
      field: 'position', 
      headerName: 'Position',
      renderCell: (row) => <div>{row.employee?.position?.position_name || 'N/A'}</div>
    },
    { 
      field: 'review_cycle', 
      headerName: 'Review Cycle',
      renderCell: (row) => <div>{row.review_cycle?.cycle_name || 'N/A'}</div>
    },
    { 
      field: 'rating', 
      headerName: 'Rating',
      renderCell: (row) => (
        <div className="rating-cell">
          <span className="rating-value">{parseFloat(row.overall_rating).toFixed(1)}</span>
          <span className="rating-max">/5</span>
        </div>
      )
    },
    {
      field: 'created_at',
      headerName: 'Review Date',
      renderCell: (row) => <div>{formatDate(row.created_at)}</div>
    },
    { 
      field: 'actions', 
      headerName: 'Actions',
      renderCell: (row) => (
        <div className="actions-cell">
          <button 
            className="action-button edit-button" 
            onClick={() => handleAddEditReview(row)}
            title="Edit Review"
          >
            <EditIcon />
          </button>
          <button 
            className="action-button delete-button" 
            onClick={() => handleDeleteReview(row)}
            title="Delete Review"
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
          onClick={() => handleAddEditReview(null)}
        >
          <i className="fas fa-plus"></i> New Performance Review
        </button>
      </header>
      
      <main>
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button className="tab-button active">Performance Reviews</button>
          <Link to="/review-cycles"><button className="tab-button">Review Cycles</button></Link>
          <button className="tab-button">Goals</button>
          <button className="tab-button">Feedback</button>
        </div>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        <div className="card">
       
          <DataTable 
            columns={columns}
            data={allPerformanceReviews}
            loading={performanceReviewsLoading}
            currentPage={allPerformanceReviewsPagination.current_page}
            totalPages={allPerformanceReviewsPagination.last_page}
            totalResults={allPerformanceReviewsPagination.total}
            resultsPerPage={allPerformanceReviewsPagination.per_page}
            onPageChange={handleAllPerformanceReviewsPageChange}
            emptyMessage="No performance reviews found"
          />
        </div>

        {/* Add/Edit Performance Review Modal */}
        <PerformanceReviewFormModal
          isOpen={formModalOpen}
          onClose={handleCloseFormModal}
          review={selectedReview}
        />
        
        {/* Delete Performance Review Modal */}
        <DeletePerformanceReviewModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          review={selectedReview}
        />
      </main>
    </div>
  );
};

export default PerformanceReviews;
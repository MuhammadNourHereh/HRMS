import React, { useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import '../styles/Modal.css';
import '../styles/ViewCycleDetails.css';
import DataTable from './DataTable';

const ViewCycleDetailsModal = ({ isOpen, onClose, reviewCycle }) => {
  const {
    cyclePerformanceReviews,
    cycleDetailsLoading,
    performanceReviewsPagination,
    fetchCycleDetails,
    handlePerformanceReviewsPageChange,
    clearCycleDetails
  } = useContext(AppContext);

  useEffect(() => {
    if (isOpen && reviewCycle) {
      fetchCycleDetails(reviewCycle);
    }
    
    return () => {
      // Clear data when modal closes
      if (!isOpen) {
        clearCycleDetails();
      }
    };
  }, [isOpen, reviewCycle]);

  if (!isOpen || !reviewCycle) return null;


  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };
  
  const columns = [
   
    { 
      field: 'employee',
      headerName: 'Employee', 
      renderCell: (row) => (
        <div className="employee-cell">
          <div className="employee-avatar">
            {getInitials(row.employee?.first_name, row.employee?.last_name)}
          </div>
          <div>{`${row.employee?.first_name || ''} ${row.employee?.last_name || ''}`}</div>
        </div>
      )
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
      field: 'comments',
      headerName: 'Comments',
      renderCell: (row) => (
        <div className="comments-cell">
          {row.comments && row.comments.length > 50 
            ? `${row.comments.substring(0, 50)}...` 
            : row.comments}
        </div>
      )
    },
    
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-fullscreen">
        <div className="modal-header">
          <h2 className="modal-title">
            {reviewCycle.cycle_name} - Performance Reviews
          </h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <DataTable 
            columns={columns}
            data={cyclePerformanceReviews}
            loading={cycleDetailsLoading}
            currentPage={performanceReviewsPagination.current_page}
            totalPages={performanceReviewsPagination.last_page}
            totalResults={performanceReviewsPagination.total}
            resultsPerPage={performanceReviewsPagination.per_page}
            onPageChange={handlePerformanceReviewsPageChange}
            emptyMessage="No performance reviews found for this cycle"
          />
          
         
        </div>
      </div>
    </div>
  );
};

export default ViewCycleDetailsModal;
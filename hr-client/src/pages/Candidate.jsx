import React, { useEffect, useState } from 'react';
import remote from '../apis/remote';
import DataTable from '../components/DataTable';
import EditCandidateModal from '../components/EditCandidateModal';
import ViewCandidateModal from '../components/ViewCandidateModal';
import DeleteCandidateModal from '../components/DeleteCandidateModal';
import '../styles/Candidates.css';
import '../styles/Employees.css';

const ViewIcon = () => <i className="fas fa-eye"></i>;
const EditIcon = () => <i className="fas fa-edit"></i>;
const DeleteIcon = () => <i className="fas fa-trash"></i>;

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10
  });
  
  const [statusFilter, setStatusFilter] = useState('all');
  
  //  state for modals
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    fetchCandidates(pagination.current_page);
  }, [statusFilter]);

  const fetchCandidates = async (page = 1) => {
    setLoading(true);
    try {
      let response;
      
      if (statusFilter === 'all') {
        response = await remote.getCandidates(page);
      } else {
        response = await remote.getCandidatesByStatus(statusFilter, page);
      }
      
      console.log('Candidates API response:', response);
      
      
      if (response) {
        
        if (response.data && Array.isArray(response.data)) {
          setCandidates(response.data);
        } 
        
        else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setCandidates(response.data.data);
          
          //  pagination from response.data
          setPagination({
            current_page: response.data.current_page || 1,
            last_page: response.data.last_page || 1,
            total: response.data.total || 0,
            per_page: response.data.per_page || 10
          });
          return;  
        } 
        // Status 
        else if (response.status === 'success' && response.data) {
          setCandidates(Array.isArray(response.data) ? response.data : []);
        }
        // Default fallback
        else {
          setCandidates([]);
        }
        
        //  pagination 
        setPagination({
          current_page: response.current_page || pagination.current_page,
          last_page: response.last_page || pagination.last_page,
          total: response.total || pagination.total,
          per_page: response.per_page || pagination.per_page
        });
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setPagination(prev => ({ ...prev, current_page: newPage }));
      fetchCandidates(newPage);
    }
  };

  // Modal handlers
  const handleOpenViewModal = (candidate) => {
    setSelectedCandidate(candidate);
    setViewModalOpen(true);
  };
  
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
  };
  
  const handleOpenEditModal = (candidate = null) => {
    setSelectedCandidate(candidate);
    setEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };
  
  const handleOpenDeleteModal = (candidate) => {
    setSelectedCandidate(candidate);
    setDeleteModalOpen(true);
  };
  
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  
  // Handle edit/delete/status change success
  const handleEditSuccess = () => {
    fetchCandidates(pagination.current_page);
  };
  
  const handleDeleteSuccess = () => {
    fetchCandidates(pagination.current_page);
  };
  
  const handleStatusChange = () => {
    fetchCandidates(pagination.current_page);
    setViewModalOpen(false);
  };
  
  // Handle  from view to edit
  const handleViewToEdit = () => {
    setViewModalOpen(false);
    setEditModalOpen(true);
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'applied': return 'status-applied';
      case 'interview': return 'status-interview';
      case 'accepted': return 'status-accepted';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  const columns = [
    { 
      field: 'name',
      headerName: 'Candidate Name', 
      renderCell: (row) => (
        <div className="employee-cell">
          <div className="employee-avatar">
            {row.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>{row.name}</div>
        </div>
      )
    },
    { field: 'email', headerName: 'Email' },
    { 
      field: 'document', 
      headerName: 'Resume',
      renderCell: (row) => (
        <div>
          {row.document ? (
            <a 
              href={row.document?.file_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="document-link"
            >
              <i className="fas fa-file-pdf"></i> View
            </a>
          ) : (
            <span className="no-document">No resume</span>
          )}
        </div>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status',
      className: 'status-cell', 
      renderCell: (row) => (
        <span className={`status-badge ${getStatusBadgeClass(row.status)}`}>
          {row.status}
        </span>
      )
    },
    { 
      field: 'created_at', 
      headerName: 'Applied Date',
      renderCell: (row) => (
        <div>
          {new Date(row.created_at).toLocaleDateString()}
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
            className="action-button delete-button" 
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
        <h1>Candidate Management</h1>
        <div className="header-actions">
          <div className="status-filter">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-select"
            >
              <option value="all">All Candidates</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <button 
            className="btn-btn"
            onClick={() => handleOpenEditModal(null)}
          >
            Add Candidate
          </button>
        </div>
      </header>
      
      <main>
        <div className="card">
          <DataTable 
            columns={columns}
            data={candidates}
            loading={loading}
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            totalResults={pagination.total}
            resultsPerPage={pagination.per_page}
            onPageChange={handlePageChange}
            emptyMessage="No candidates found"
          />
        </div>

        {/* View Candidate Modal */}
        <ViewCandidateModal 
          isOpen={viewModalOpen}
          onClose={handleCloseViewModal}
          candidate={selectedCandidate}
          onStatusChange={handleStatusChange}
          onEdit={handleViewToEdit}
        />
        
        {/* Edit Candidate Modal */}
        <EditCandidateModal 
          isOpen={editModalOpen}
          onClose={handleCloseEditModal}
          candidate={selectedCandidate}
          onSuccess={handleEditSuccess}
        />
        
        {/* Delete Candidate Modal */}
        <DeleteCandidateModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          candidate={selectedCandidate}
          onDelete={handleDeleteSuccess}
        />
      </main>
    </div>
  );
}

export default Candidates;
import React, { useEffect, useState } from 'react';
import remote from '../apis/remote';
import DataTable from '../components/DataTable';
import AddProjectModal from '../components/AddProjectModal';
import '../styles/Employees.css';
import "../styles/status-badges.css"

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10
  });
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects(pagination.current_page);
  }, []);

  const fetchProjects = async (page = 1) => {
    setLoading(true);
    try {
      const response = await remote.getProjects(page);
      
      // Handle different response structures
      if (response && response.data) {
        // Handle nested data structure
        const projectsData = response.data.data || response.data || [];
        setProjects(projectsData);
        
        // Handle pagination data
        const paginationData = response.data || response;
        setPagination({
          current_page: paginationData.current_page || 1,
          last_page: paginationData.last_page || 1,
          total: paginationData.total || 0,
          per_page: paginationData.per_page || 10
        });
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setPagination(prev => ({ ...prev, current_page: newPage }));
      fetchProjects(newPage);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'in_progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  // Add project modal handlers
  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAddSuccess = () => {
    // Refresh the projects list after adding
    fetchProjects(pagination.current_page);
  };

  const columns = [
    { 
      field: 'title',
      headerName: 'Project Title'
    },
    { 
      field: 'description', 
      headerName: 'Description',
      renderCell: (row) => (
        <div>
          {row.description?.length > 50
            ? `${row.description.substring(0, 50)}...`
            : row.description || 'No description'}
        </div>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status',
      renderCell: (row) => (
        <span className={`status-badge ${getStatusClass(row.status)}`}>
          {row.status === 'in_progress' ? 'In Progress' : 
           row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      )
    },
    { 
      field: 'created_at', 
      headerName: 'Created Date',
      renderCell: (row) => (
        <div>
          {new Date(row.created_at).toLocaleDateString()}
        </div>
      )
    }
  ];

  return (
    <div className="container margin-right">
      <header className="page-header">
        <h1>Projects</h1>
        <button 
          className="btn-btn"
          onClick={handleOpenAddModal}
        >
          Add Project
        </button>
      </header>
      
      <main>
        <div className="card">
          <DataTable 
            columns={columns}
            data={projects}
            loading={loading}
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            totalResults={pagination.total}
            resultsPerPage={pagination.per_page}
            onPageChange={handlePageChange}
            emptyMessage="No projects found"
          />
        </div>

        {/* Add Project Modal */}
        <AddProjectModal 
          isOpen={addModalOpen}
          onClose={handleCloseAddModal}
          onSuccess={handleAddSuccess}
        />
      </main>
    </div>
  );
}

export default Projects;
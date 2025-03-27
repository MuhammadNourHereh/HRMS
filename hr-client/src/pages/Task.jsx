import React, { useEffect, useState } from 'react';
import remote from '../apis/remote';
import DataTable from '../components/DataTable';
import AddTaskModal from '../components/AddTaskModal';
import '../styles/Employees.css';
import "../styles/status-badges.css"

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10
  });
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks(pagination.current_page);
  }, []);

  const fetchTasks = async (page = 1) => {
    setLoading(true);
    try {
      const response = await remote.getTasks(page);
      
      
      if (response && response.data) {
        
        const tasksData = response.data.data || response.data || [];
        setTasks(tasksData);
        
        // Handle pagination data
        const paginationData = response.data || response;
        setPagination({
          current_page: paginationData.current_page || 1,
          last_page: paginationData.last_page || 1,
          total: paginationData.total || 0,
          per_page: paginationData.per_page || 10
        });
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setPagination(prev => ({ ...prev, current_page: newPage }));
      fetchTasks(newPage);
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

  // Add task modal handlers
  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAddSuccess = () => {
    // Refresh the tasks list after adding
    fetchTasks(pagination.current_page);
  };

  const columns = [
    { 
      field: 'title',
      headerName: 'Task Title'
    },
    { 
      field: 'project', 
      headerName: 'Project',
      renderCell: (row) => (
        <div>
          {row.project?.title || 'No project'}
        </div>
      )
    },
    { 
      field: 'description', 
      headerName: 'Description',
      renderCell: (row) => (
        <div>
          {row.description?.length > 30
            ? `${row.description.substring(0, 30)}...`
            : row.description || 'No description'}
        </div>
      )
    },
    { 
      field: 'employee', 
      headerName: 'Assigned To',
      renderCell: (row) => (
        <div>
          {row.employee ? `${row.employee.first_name} ${row.employee.last_name}` : 'Unassigned'}
        </div>
      )
    },
    { 
      field: 'due_date', 
      headerName: 'Due Date',
      renderCell: (row) => (
        <div>
          {row.due_date ? new Date(row.due_date).toLocaleDateString() : 'No due date'}
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
    }
  ];

  return (
    <div className="container margin-right">
      <header className="page-header">
        <h1>Tasks</h1>
        <button 
          className="button button-primary"
          onClick={handleOpenAddModal}
        >
          Add Task
        </button>
      </header>
      
      <main>
        <div className="card">
          <DataTable 
            columns={columns}
            data={tasks}
            loading={loading}
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            totalResults={pagination.total}
            resultsPerPage={pagination.per_page}
            onPageChange={handlePageChange}
            emptyMessage="No tasks found"
          />
        </div>

        {/* Add Task Modal */}
        <AddTaskModal 
          isOpen={addModalOpen}
          onClose={handleCloseAddModal}
          onSuccess={handleAddSuccess}
        />
      </main>
    </div>
  );
}

export default Tasks;
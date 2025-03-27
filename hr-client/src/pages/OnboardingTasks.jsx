import React, { useEffect, useState } from 'react';
import remote from '../apis/remote';
import DataTable from '../components/DataTable';
import '../styles/Employees.css';

const EditIcon = () => <i className="fas fa-edit"></i>;
const DeleteIcon = () => <i className="fas fa-trash"></i>;

function OnboardingTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10
  });
  
  // Task modal state
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks(pagination.current_page);
  }, []);

  const fetchTasks = async (page = 1) => {
    setLoading(true);
    try {
      const response = await remote.getOnboardingTasks(page);
      
      console.log('Tasks API response:', response);
      

      if (response) {
        
        if (response.data && Array.isArray(response.data)) {
          setTasks(response.data);
        } 
       
        else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setTasks(response.data.data);
          
          //  pagination from response.data
          setPagination({
            current_page: response.data.current_page || 1,
            last_page: response.data.last_page || 1,
            total: response.data.total || 0,
            per_page: response.data.per_page || 10
          });
          return; 
        } 
        
        else if (response.status === 'success' && response.data) {
          setTasks(Array.isArray(response.data) ? response.data : []);
        }
        
        else {
          setTasks([]);
        }
        
        // Set pagination if not already set
        setPagination({
          current_page: response.current_page || pagination.current_page,
          last_page: response.last_page || pagination.last_page,
          total: response.total || pagination.total,
          per_page: response.per_page || pagination.per_page
        });
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

  // Modal handlers
  const handleOpenTaskModal = (task = null) => {
    setSelectedTask(task);
    setTaskModalOpen(true);
  };
  
  const handleCloseTaskModal = () => {
    setTaskModalOpen(false);
  };
  
  // Handle task operations
  const handleTaskSuccess = () => {
    fetchTasks(pagination.current_page);
  };

  const deleteTask = async (taskId) => {
    try {
      await remote.deleteOnboardingTask(taskId);
      fetchTasks(pagination.current_page);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const columns = [
    { 
      field: 'title',
      headerName: 'Task Title'
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
      field: 'is_required', 
      headerName: 'Required',
      renderCell: (row) => (
        <span className={`status-badge ${row.is_required ? 'status-required' : 'status-optional'}`}>
          {row.is_required ? 'Required' : 'Optional'}
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
    },
    { 
      field: 'actions', 
      headerName: 'Actions',
      renderCell: (row) => (
        <div className="actions-cell">
          <button 
            className="action-button edit-button" 
            onClick={() => handleOpenTaskModal(row)}
            title="Edit"
          >
            <EditIcon />
          </button>
          <button 
            className="action-button delete-button" 
            onClick={() => deleteTask(row.id)}
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
        <h1>Onboarding Tasks</h1>
        <button 
          className="btn-btn"
          onClick={() => handleOpenTaskModal(null)}
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
            emptyMessage="No onboarding tasks found"
          />
        </div>

        {/* Task Modal */}
        {taskModalOpen && (
          <TaskModal 
            isOpen={taskModalOpen}
            onClose={handleCloseTaskModal}
            task={selectedTask}
            onSuccess={handleTaskSuccess}
          />
        )}
      </main>
    </div>
  );
}

// Task Modal Component
const TaskModal = ({ isOpen, onClose, task, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_required: true
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        is_required: task.is_required ?? true
      });
    } else {
      setFormData({
        title: '',
        description: '',
        is_required: true
      });
    }
    setError(null);
  }, [task, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const id = task?.id || 'add';
      await remote.addOrUpdateOnboardingTask(id, formData);
      
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
      setError("Failed to save task. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            {task ? "Edit Onboarding Task" : "Add Onboarding Task"}
          </h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Task Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="4"
              />
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  name="is_required" 
                  checked={formData.is_required} 
                  onChange={handleChange} 
                />
                Required Task
              </label>
            </div>
            
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}
            
            <div className="form-actions">
              <button 
                type="button" 
                className="button button-secondary" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="button button-primary"
              >
                {task ? "Update Task" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTasks;
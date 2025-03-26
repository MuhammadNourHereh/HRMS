import './Employees.css'
// EXAMPLE FOR USING MODALS AND TABLES
function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    // INITAILIZING DATA FOR THE PAGINATION
    const [paginationData, setPaginationData] = useState({
      current_page: 1,
      last_page: 1,
      total: 0,
      per_page: 10
    });
    // the modal stuff
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    
    useEffect(() => {
      fetchEmployees(paginationData.current_page);
    }, [paginationData.current_page]);
    
    const fetchEmployees = async (page) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v0.1/get-employees?page=${page}`);
        //sets employees
        setEmployees(response.data.data || []);
        //sets the pagination
        setPaginationData({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          total: response.data.total,
          per_page: response.data.per_page
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false);
        setEmployees([]);
      }
    };
    // goes from a page to a new one or goes back 
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= paginationData.last_page) {
        setPaginationData(prev => ({ ...prev, current_page: newPage }));
      }
    };
    const getInitials = (name) => {
      return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase();
    };
    // handles the columns
    // the rendercell customizes what appears inside each table cell instead of raw data
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
  
    const handleView = (employee) => {
      setSelectedEmployee(employee);
      setIsModalOpen(true);
    };
    

  return (
    <>
    <div className="app-container">
      <header>
        <h1>Employee Directory</h1>
      </header>
      
      <main>
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

        <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={selectedEmployee ? `${selectedEmployee.name} Details` : 'Employee Details'}
        fullscreen={true}
      >
        {selectedEmployee && (
          <div className="employee-details">
            <div className="detail-group">
              <div className="detail-avatar">
                {getInitials(selectedEmployee.name)}
              </div>
              <h3>{selectedEmployee.name}</h3>
              <span className={`status-badge status-${selectedEmployee.status.toLowerCase()}`}>
                {selectedEmployee.status}
              </span>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Department</div>
              <div className="detail-value">{selectedEmployee.department}</div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="button button-secondary" 
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button 
                className="button button-primary"
                onClick={() => {
                  alert(`Save changes for ${selectedEmployee.name}`);
                  setIsModalOpen(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>
      </main>
</div>
    </>
  )
}

export default Employees

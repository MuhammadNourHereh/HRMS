import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import remote from "../apis/remote";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
    const navigate = useNavigate();

    // Auth state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Employee state
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10
    });
    
    // Review Cycle state
    const [reviewCycles, setReviewCycles] = useState([]);
    const [reviewCycleLoading, setReviewCycleLoading] = useState(false);
    const [reviewCyclePagination, setReviewCyclePagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10
    });
    
    // Review Cycle Details state
    const [performanceReviews, setPerformanceReviews] = useState([]);
    const [cycleDetailsLoading, setCycleDetailsLoading] = useState(false);
    const [performanceReviewsPagination, setPerformanceReviewsPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10
    });
    
    // Review Cycle Form Loading State
    const [reviewCycleFormLoading, setReviewCycleFormLoading] = useState(false);
    

    // Modal state
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Payroll state
    const [payrolls, setPayrolls] = useState([]);
    const [payrollsLoading, setPayrollsLoading] = useState(false);
    const [payrollsError, setPayrollsError] = useState(null);
    const [payrollsPagination, setPayrollsPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
        perPage: 10
    });

    // Dummy data generator for payrolls
    const getDummyPayrolls = () => {
        return [
            {
                id: 1,
                employee_id: 1,
                employee: { name: 'John Doe', department: 'HR' },
                amount: 2500.00,
                payed_at: null,
                created_at: new Date().toISOString()
            },
            {
                id: 2,
                employee_id: 2,
                employee: { name: 'Jane Smith', department: 'Finance' },
                amount: 3200.50,
                payed_at: new Date().toISOString(),
                created_at: new Date().toISOString()
            }
        ];
    };

    // Payroll functions
    const fetchPayrolls = async (page = 1, perPage = 10) => {
        setPayrollsLoading(true);
        setPayrollsError(null);
        try {
            const response = await remote.getPayrolls(page, perPage);
            setPayrolls(response.data || []);
            setPayrollsPagination({
                currentPage: response.current_page || 1,
                lastPage: response.last_page || 1,
                total: response.total || 0,
                perPage: response.per_page || perPage
            });
        } catch (err) {
            setPayrollsError(err.message);
            // Fallback to dummy data if server fails
            setPayrolls(getDummyPayrolls());
            setPayrollsPagination(prev => ({
                ...prev,
                total: getDummyPayrolls().length,
                lastPage: Math.ceil(getDummyPayrolls().length / perPage)
            }));
        } finally {
            setPayrollsLoading(false);
        }
    };

    const markAsPaid = async (payrollId) => {
        try {
            await remote.markAsPaid(payrollId);
            setPayrolls(prev => prev.map(p =>
                p.id === payrollId ? { ...p, payed_at: new Date().toISOString() } : p
            ));
        } catch (err) {
            setPayrollsError(err.message);
        }
    };

    // Check auth status on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkAuthStatus();
        }
    }, []);

    // Check if user is authenticated
    const checkAuthStatus = async () => {
        try {
            const userData = await remote.getProfile();
            setUser(userData);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Auth check failed:", error);
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('token');
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            const response = await remote.login(email, password);

            if (response.success && response.employee.token) {
                localStorage.setItem('token', response.employee.token);
                setUser(response.employee);
                setIsAuthenticated(true);
                navigate('/');
                return { success: true };
            } else {
                return { success: false, message: "Login failed" };
            }
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                message: error.response?.data?.error || "Login failed"
            };
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await remote.logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login');
        }
    };

    // Fetch employees
    const fetchEmployees = async (page = 1) => {
        setLoading(true);
        try {
            const response = await remote.getEmployees(page);

            // Set employees data
            setEmployees(response.data.data || []);

            // Set pagination
            setPagination({
                current_page: response.data.current_page,
                last_page: response.data.last_page,
                total: response.data.total,
                per_page: response.data.per_page
            });
        } catch (error) {
            console.error('Error fetching employees:', error);
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.last_page) {
            setPagination(prev => ({ ...prev, current_page: newPage }));
            fetchEmployees(newPage);
        }
    };

    // View employee details
    const viewEmployeeDetails = (employee) => {
        setSelectedEmployee(employee);
        setModalOpen(true);
    };

    // Close employee modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Delete employee
    const deleteEmployee = async (employeeId) => {

        try {
            await remote.deleteEmployee(employeeId);
            fetchEmployees(pagination.current_page);
            return { success: true };
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert("Failed to delete employee");
            return { success: false, message: error.message };
        }
    };

    // Fetch review cycles
    const fetchReviewCycles = async (page = 1) => {
        setReviewCycleLoading(true);
        try {
            const response = await remote.getReviewCycles(page);
            
            // Set review cycles data
            setReviewCycles(response.data.data || []);
            
            // Set pagination
            setReviewCyclePagination({
                current_page: response.data.current_page,
                last_page: response.data.last_page,
                total: response.data.total,
                per_page: response.data.per_page
            });
        } catch (error) {
            console.error('Error fetching review cycles:', error);
            setReviewCycles([]);
        } finally {
            setReviewCycleLoading(false);
        }
    };

    // Handle review cycle page change
    const handleReviewCyclePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= reviewCyclePagination.last_page) {
            setReviewCyclePagination(prev => ({ ...prev, current_page: newPage }));
            fetchReviewCycles(newPage);
        }
    };

    // Fetch review cycle details
    const fetchCycleDetails = async (reviewCycle, page = 1) => {
        if (!reviewCycle) return;
        
        setCycleDetailsLoading(true);
        
        try {
            const response = await remote.getReviewCycleById(reviewCycle.id);
            
            if (response.status === 'success' && response.data) {
                // Extract performance reviews only
                const reviews = response.data.performance_reviews || [];
                setPerformanceReviews(reviews);
                
                // Set pagination based on results
                const totalPages = Math.ceil(reviews.length / 10);
                
                setPerformanceReviewsPagination({
                    current_page: page,
                    last_page: totalPages > 0 ? totalPages : 1,
                    total: reviews.length,
                    per_page: 10
                });
            }
        } catch (error) {
            console.error('Error fetching cycle details:', error);
            setPerformanceReviews([]);
        } finally {
            setCycleDetailsLoading(false);
        }
    };
    
    // Handle performance reviews page change
    const handlePerformanceReviewsPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= performanceReviewsPagination.last_page) {
            setPerformanceReviewsPagination(prev => ({ ...prev, current_page: newPage }));
        }
    };

    // Clear cycle details
    const clearCycleDetails = () => {
        setPerformanceReviews([]);
    };
    
    // Add or Update Review Cycle
    const addOrUpdateReviewCycle = async (id, data) => {
        setReviewCycleFormLoading(true);
        try {
            const response = await remote.addOrUpdateReviewCycle(id, data);
            
            // Refresh review cycles list
            await fetchReviewCycles(reviewCyclePagination.current_page);
            
            return { 
                success: true, 
                message: id === 'add' ? 'Review cycle created successfully' : 'Review cycle updated successfully',
                data: response.data
            };
        } catch (error) {
            console.error('Error saving review cycle:', error);
            
            const errorMessage = error.response?.data?.errors
                ? Object.values(error.response.data.errors).flat().join(', ')
                : error.response?.data?.message || "Failed to save review cycle";
                
            return { 
                success: false, 
                message: errorMessage
            };
        } finally {
            setReviewCycleFormLoading(false);
        }
    };
    
    // Delete Review Cycle
    const deleteReviewCycle = async (id) => {
        try {
            await remote.deleteReviewCycle(id);
            await fetchReviewCycles(reviewCyclePagination.current_page);
            return { success: true, message: 'Review cycle deleted successfully' };
        } catch (error) {
            console.error('Error deleting review cycle:', error);
            return { 
                success: false, 
                message: error.response?.data?.message || "Failed to delete review cycle"
            };
        }

    };

    return (
        <AppContext.Provider value={{
            // Navigation
            navigate,

            // Auth state and functions
            isAuthenticated,
            user,
            login,
            logout,

            // Employee state
            employees,
            loading,
            pagination,
            selectedEmployee,
            modalOpen,

            // Employee functions
            fetchEmployees,
            handlePageChange,
            viewEmployeeDetails,
            closeModal,
            deleteEmployee,
            
            // Review Cycle state and functions
            reviewCycles,
            reviewCycleLoading,
            reviewCyclePagination,
            fetchReviewCycles,
            handleReviewCyclePageChange,
            
            // Review Cycle CRUD
            reviewCycleFormLoading,
            addOrUpdateReviewCycle,
            deleteReviewCycle,
            
            // Review Cycle Details state and functions
            performanceReviews,
            cycleDetailsLoading,
            performanceReviewsPagination,
            fetchCycleDetails,
            handlePerformanceReviewsPageChange,
            clearCycleDetails,

            // Payroll state
            payrolls,
            payrollsLoading,
            payrollsError,
            payrollsPagination,

            // Payroll functions
            fetchPayrolls,
            markAsPaid,
            setPayrollsPagination
        }}>
            {children}
        </AppContext.Provider>
    );
}
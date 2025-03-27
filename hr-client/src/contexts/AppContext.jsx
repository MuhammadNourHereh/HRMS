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

    // Modal state
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [payroll, setPayroll] = useState({})

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

            // payrolls states
            payroll, setPayroll
        }}>
            {children}
        </AppContext.Provider>
    );
}
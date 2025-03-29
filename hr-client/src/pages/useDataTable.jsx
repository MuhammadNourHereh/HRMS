// src/context/PayrollContext.js
import { createContext, useState, useContext } from 'react';
import remote from '../api/remote';

const PayrollContext = createContext();

export const PayrollProvider = ({ children }) => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 10
  });

  const fetchPayrolls = async (page = 1, perPage = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await remote.getPayrolls(page, perPage);
      setPayrolls(response.data || []);
      setPagination({
        currentPage: response.current_page || 1,
        lastPage: response.last_page || 1,
        total: response.total || 0,
        perPage: response.per_page || perPage
      });
    } catch (err) {
      setError(err.message);
      // Fallback to dummy data if server fails
      setPayrolls(getDummyPayrolls());
      setPagination(prev => ({
        ...prev,
        total: getDummyPayrolls().length,
        lastPage: Math.ceil(getDummyPayrolls().length / perPage)
      }));
    } finally {
      setLoading(false);
    }
  };

  const markAsPaid = async (payrollId) => {
    try {
      await remote.markAsPaid(payrollId);
      setPayrolls(prev => prev.map(p => 
        p.id === payrollId ? { ...p, payed_at: new Date().toISOString() } : p
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  // Dummy data generator
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

  return (
    <PayrollContext.Provider
      value={{
        payrolls,
        loading,
        error,
        pagination,
        fetchPayrolls,
        markAsPaid,
        setPagination
      }}
    >
      {children}
    </PayrollContext.Provider>
  );
};

export const usePayroll = () => {
  const context = useContext(PayrollContext);
  if (!context) {
    throw new Error('usePayroll must be used within a PayrollProvider');
  }
  return context;
};
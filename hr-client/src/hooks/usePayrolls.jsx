import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';

const usePayrolls = () => {
    const {
        navigate,
        payrolls,
        payrollsLoading,
        payrollsError,
        payrollsPagination,
        fetchPayrolls,
        markAsPaid,
        setPayrollsPagination
    } = useContext(AppContext);

    const [displayData, setDisplayData] = useState([]);
    const [displayPagination, setDisplayPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 1,
        perPage: 10
    });

  useEffect(() => {
    fetchPayrolls(1);
  }, []);
    // Generate dummy payroll data
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
            },
            {
                id: 3,
                employee_id: 3,
                employee: { name: 'Bob Johnson', department: 'IT' },
                amount: 2850.75,
                payed_at: null,
                created_at: new Date().toISOString()
            }
        ];
    };

    useEffect(() => {
        if (payrollsError) {
            // Use dummy data when there's an error
            const dummyData = getDummyPayrolls();
            setDisplayData(dummyData);
            setDisplayPagination({
                currentPage: 1,
                lastPage: 1,
                total: dummyData.length,
                perPage: 10
            });
        } else {
            // Use real data when available
            setDisplayData(payrolls);
            setDisplayPagination(payrollsPagination);
        }
    }, [payrolls, payrollsError, payrollsPagination]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= displayPagination.lastPage) {
            if (payrollsError) {
                // For dummy data, just update the local pagination
                setDisplayPagination(prev => ({ ...prev, currentPage: newPage }));
            } else {
                // For real data, fetch the new page
                setPayrollsPagination(prev => ({ ...prev, currentPage: newPage }));
                fetchPayrolls(newPage, displayPagination.perPage);
            }
        }
    };

    const getPaginatedData = () => {
        if (payrollsError) {
            const startIndex = (displayPagination.currentPage - 1) * displayPagination.perPage;
            const endIndex = startIndex + displayPagination.perPage;
            return displayData.slice(startIndex, endIndex);
        }
        return displayData;
    };

    const columns = [
        {
            field: 'employee',
            headerName: 'Employee',
            renderCell: (row) => (
                <div className="employee-cell">
                    <div className="employee-avatar">
                        {row.employee?.first_name ? getInitials(row.employee.first_name) : 'NA'}
                    </div>
                    <div>
                        <div>{row.employee?.first_name || 'Unknown Employee'}</div>
                        <small className="text-muted">{row.employee?.department || ''}</small>
                    </div>
                </div>
            )
        },
        {
            field: 'amount',
            headerName: 'Amount',
            renderCell: (row) => (
                <span className="amount">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(row.amount)}
                </span>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            renderCell: (row) => (
                <span className={`status-badge ${row.payed_at ? 'status-paid' : 'status-pending'}`}>
                    {row.payed_at ? 'Paid' : 'Pending'}
                </span>
            )
        },
        {
            field: 'payed_at',
            headerName: 'Payment Date',
            renderCell: (row) => (
                row.payed_at
                    ? new Date(row.payed_at).toLocaleDateString()
                    : 'Not paid yet'
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (row) => (
                <div className="actions-cell">
                    <button
                        className="action-button"
                        onClick={() => markAsPaid(row.id)}
                        disabled={!!row.payed_at || payrollsError}
                    >
                        Mark as Paid
                    </button>
                    <button
                        className="action-button edit-button"
                        onClick={() => handleEditPayroll(row)}
                        disabled={payrollsError}
                    >
                        Edit
                    </button>
                </div>
            )
        }
    ];

    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase();
    };

    const handleEditPayroll = (payroll) => {
        console.log('Edit payroll:', payroll);
    };

    return {
        navigateHome: () => navigate('/home'),
        navigateApprove: () => navigate('/payrolls-approve'),
        columns,
        payrollsLoading,
        displayPagination,
        getPaginatedData,
        handlePageChange,
        payrollsError,
    };
}




export default usePayrolls;
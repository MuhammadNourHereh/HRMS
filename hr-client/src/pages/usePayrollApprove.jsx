import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { formatCurrency, formatDate } from '../utils/format';

export const usePayrollsApprove = () => {
  // Configuration constants
  const TAX_PERCENTAGE = 7;
  const DAYS_AFTER_ACCOUNT_DATE = 5;

  // State management with calculations
  const [totalDirectDeposit, setTotalDirectDeposit] = useState(412512);
  const [accountDebitDate, setAccountDebitDate] = useState(new Date('2025-03-27'));

  // Derived state calculations
  const [totalEmployeeTaxes, setTotalEmployeeTaxes] = useState(() =>
    (totalDirectDeposit * TAX_PERCENTAGE) / 100
  );

  const [totalDebit, setTotalDebit] = useState(() =>
    totalDirectDeposit + totalEmployeeTaxes
  );

  const [employeePayDate, setEmployeePayDate] = useState(() => {
    const calculatedPayDate = new Date(accountDebitDate);
    calculatedPayDate.setDate(accountDebitDate.getDate() + DAYS_AFTER_ACCOUNT_DATE);
    return calculatedPayDate;
  });

  // Context integration
  const { navigate, payroll, setPayroll } = useContext(AppContext);

  // Effect to recalculate dependent values when base values change
  useEffect(() => {
    // Recalculate employee taxes
    const calculatedTaxes = (totalDirectDeposit * TAX_PERCENTAGE) / 100;
    setTotalEmployeeTaxes(calculatedTaxes);

    // Recalculate total debit
    const calculatedTotalDebit = totalDirectDeposit + calculatedTaxes;
    setTotalDebit(calculatedTotalDebit);

    // Recalculate employee pay date
    const calculatedPayDate = new Date(accountDebitDate);
    calculatedPayDate.setDate(accountDebitDate.getDate() + DAYS_AFTER_ACCOUNT_DATE);
    setEmployeePayDate(calculatedPayDate);
  }, [totalDirectDeposit, accountDebitDate]);

  return {
    totalDebit: formatCurrency(totalDebit),
    totalEmployeeTaxes: formatCurrency(totalEmployeeTaxes),
    totalDirectDeposit: formatCurrency(totalDirectDeposit),
    accountDebitDate: formatDate(accountDebitDate),
    employeePayDate: formatDate(employeePayDate),
    navigateHome: () => navigate('/'),
    navigateDone: () => navigate('/payrollsdone'),
  };
};

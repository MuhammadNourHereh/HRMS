import DebitSummaryTable from '../components/DebitSummaryTable';
import { usePayrollsApprove } from '../hooks/usePayrollApprove';


const PayrollsApprove = () => {
    const {
        totalDebit,
        totalEmployeeTaxes,
        totalDirectDeposit,
        accountDebitDate,
        employeePayDate,
        navigatePayrolls,
        navigateDone
    } = usePayrollsApprove();


    return (
        <div className='column container2 spread'>
            <div className="container">
                <DebitSummaryTable
                    accountDebitDate={accountDebitDate}
                    employeePayDate={employeePayDate}
                    totalDirectDeposit={totalDirectDeposit}
                    totalEmployeeTaxes={totalEmployeeTaxes}
                    totalDebit={totalDebit}
                />
            </div>
            <div className="container">
                <div className='spread'>
                    <button className='btn-btn' onClick={navigatePayrolls}>Back to payrolls</button>
                    <button className='btn-btn' onClick={navigateDone}>Approve Payrolls</button>
                </div>
            </div>
        </div>
    )
}

export default PayrollsApprove
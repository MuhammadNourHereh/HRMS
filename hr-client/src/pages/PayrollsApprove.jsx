import { usePayrollsApprove } from './usePayrollApprove';

const PayrollsApprove = () => {
    const {
        totalDebit,
        totalEmployeeTaxes,
        totalDirectDeposit,
        accountDebitDate,
        employeePayDate,
        navigateHome,
        navigateDone
    } = usePayrollsApprove();
    return (
        <div className='container center-warpper' >

            <div className="container2 margin-left">
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='th' colSpan="2">
                                Debit Summary
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="row-label td">Account Debit Date</td>
                            <td className="row-value td">{accountDebitDate}</td>
                        </tr>
                        <tr>
                            <td className="row-label td">Employee Pay Date</td>
                            <td className="row-value td">{employeePayDate}</td>
                        </tr>
                        <tr>
                            <td className="row-label td">Total Direct Deposit</td>
                            <td className="row-value total-direct-deposit td">
                                {totalDirectDeposit}
                            </td>
                        </tr>
                        <tr>
                            <td className="row-label td">Total Employer Taxes</td>
                            <td className="row-value td">
                                {totalEmployeeTaxes}
                            </td>
                        </tr>
                        <tr>
                            <td className="row-label total-debit td">Total Debit</td>
                            <td className="row-value total-debit td">
                                {totalDebit}
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className="container margin-left ">
                <div className='spread'>
                    <button className='btn-btn' onClick={navigateHome}>back to home</button>
                    <button className='btn-btn' onClick={navigateDone}>Approve Payrolls</button>
                </div>
            </div>
            </div>
            
    )
}

export default PayrollsApprove
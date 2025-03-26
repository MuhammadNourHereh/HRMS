<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Payroll;
use App\Models\Overtime;
use App\Models\Deduction;
use App\Models\Salary;

class PayrollsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all();

        foreach ($employees as $emp) {
            // Get total paid overtime
            $salary = Salary::where('employee_id', $emp->id)
                ->whereNull('payed_at') // Exclude paid overtime
                ->sum('amount');

            $overtimeHours = Overtime::where('employee_id', $emp->id)
                ->whereNull('payed_at') // Exclude paid overtime
                ->sum('hours');

            $overtimePayRate = Overtime::where('employee_id', $emp->id)
                ->whereNull('payed_at') // Exclude paid overtime
                ->avg('pay_rate') ?? 0;

            $overtimePay = $overtimeHours * $overtimePayRate;

            // Get total paid deductions
            $totalDeductions = Deduction::where('employee_id', $emp->id)
                ->whereNull('payed_at') // Exclude paid deductions
                ->sum('amount');

            // Calculate final payroll amount
            $finalAmount = ($salary + $overtimePay) - $totalDeductions;

            // Store payroll details in JSON format
            $payrollDetails = [
                'base_salary' => $emp->salary,
                'overtime_hours' => $overtimeHours,
                'overtime_pay' => $overtimePay,
                'total_deductions' => $totalDeductions,
                'final_salary' => $finalAmount,
            ];

            Payroll::create([
                'employee_id' => $emp->id,
                'amount' => $finalAmount,
                'payroll_details' => json_encode($payrollDetails),
                'payed_at' => null,
            ]);

            $now = now();
            // Mark all unpaid overtime as paid
            Overtime::where('employee_id', $emp->id)
                ->whereNull('payed_at')
                ->update(['payed_at' => $now]);

            // Mark all unpaid deductions as paid
            Deduction::where('employee_id', $emp->id)
                ->whereNull('payed_at')
                ->update(['payed_at' => $now]);
            // Mark all unpaid salaries as paid
            Salary::where('employee_id', $emp->id)
                ->whereNull('payed_at')
                ->update(['payed_at' => $now]);
        }
    }
}

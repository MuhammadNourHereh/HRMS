<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\LeavePolicy;

class LeavePolicySeeder extends Seeder
{
    public function run()
    {
        $employees = Employee::all();

        foreach ($employees as $employee) {
            // Common leave policies for everyone
            LeavePolicy::firstOrCreate([
                'employee_id' => $employee->id,
                'leave_type' => 'Sick',
                'balance' => 10
            ]);

            LeavePolicy::firstOrCreate([
                'employee_id' => $employee->id,
                'leave_type' => 'Other',
                'balance' => 0
            ]);

            // Gender-based leave policies
            if ($employee->gender === 'female') {
                LeavePolicy::firstOrCreate([
                    'employee_id' => $employee->id,
                    'leave_type' => 'Maternity',
                    'balance' => 60
                ]);
            } elseif ($employee->gender === 'male') {
                LeavePolicy::firstOrCreate([
                    'employee_id' => $employee->id,
                    'leave_type' => 'Paternity',
                    'balance' => 15
                ]);
            }
        }
    }
}

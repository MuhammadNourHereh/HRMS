<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Salary;
use Illuminate\Database\Seeder;

class SalarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all();

        foreach ($employees as $emp) {
            Salary::create([
                "employee_id" => $emp->id,
                "amount" => $emp->salary,
            ]);
        }
    }
}

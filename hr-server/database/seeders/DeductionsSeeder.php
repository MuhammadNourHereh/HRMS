<?php

namespace Database\Seeders;

use App\Models\Deduction;
use App\Models\Employee;
use Illuminate\Database\Seeder;

class DeductionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all();

        foreach ($employees as $emp) {
            Deduction::create([
                'employee_id' => $emp->id,
                'reason' => 'Health & social benefits deduction',
                'amount' => $emp->salary * 0.10, // Deduct 10% of the salary
                'payed_at' => null,
            ]);
        }
    }
}

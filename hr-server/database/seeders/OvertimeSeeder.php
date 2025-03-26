<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Overtime;

class OvertimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all();

        foreach ($employees as $emp) {
            Overtime::create([
                'employee_id' => $emp->id,
                'hours' => fake()->numberBetween(0, 20),
                'pay_rate' => fake()->randomFloat(2, 2, 10), // 2 decimal places, min $2, max $10
                'payed_at' => now(),
            ]);
        }
    }
}


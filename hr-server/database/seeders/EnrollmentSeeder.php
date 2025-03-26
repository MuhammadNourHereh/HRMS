<?php

namespace Database\Seeders;
use App\Models\Enrollment;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Enrollment::create([
            'employee_id' => 2, 
            'program_id' => 3, 
            'completion_date' => now()->addDays(rand(30, 365)),
            'status' => 'InProgress', 
            'score' => rand(50, 100), 
            'progress' => rand(1, 100), 
        ]);

        Enrollment::create([
            'employee_id' => 2,
            'program_id' => 1,
            'completion_date' => now()->addDays(rand(30, 365)),
            'status' => 'InProgress', 
            'score' => rand(50, 100),
            'progress' => rand(1, 100), 
        ]);

        Enrollment::create([
            'employee_id' => 3,
            'program_id' => 3,
            'completion_date' => now()->addDays(rand(30, 365)),
            'status' => 'InProgress', 
            'score' => 0,
            'progress' => 0, 
        ]);
    }
}

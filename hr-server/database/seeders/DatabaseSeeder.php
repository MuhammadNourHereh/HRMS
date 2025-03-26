<?php

namespace Database\Seeders;

use App\Models\ReviewCycle;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PositionSeeder::class,
            DepartmentSeeder::class,
            EmployeeSeeder::class,
            LeavePolicySeeder::class,
            LeaveSeeder::class,
            ProgramSeeder::class,
            EnrollmentSeeder::class,
            ReviewCycleSeeder::class,
            PerformancesReviewSeeder::class,
            GoalSeeder::class

        ]);
    }
}
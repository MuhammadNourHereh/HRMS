<?php

namespace Database\Seeders;

use App\Models\GoalProgress;
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
            // LeavePolicySeeder::class,
            // LeaveSeeder::class,
            // ProgramSeeder::class,
            // EnrollmentSeeder::class,
            ReviewCycleSeeder::class,
            PerformancesReviewSeeder::class,
            GoalSeeder::class,
            GoalProgressSeeder::class,
            FeedbackSeeder::class,
            // candidatesSeeder::class,
            // EmployeeOnboardingSeeder::class,
            // OnboardingTaskSeeder::class,
            // ReportSeeder::class,
            // TaskSeeder::class,
        ]);
    }
}
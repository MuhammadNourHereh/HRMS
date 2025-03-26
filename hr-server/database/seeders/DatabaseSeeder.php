<?php

namespace Database\Seeders;

use App\Models\ReviewCycle;
use App\Models\GoalProgress;
use Illuminate\Database\Seeder;
use Database\Seeders\GoalSeeder;
use Database\Seeders\TaskSeeder;
use Database\Seeders\LeaveSeeder;
use Database\Seeders\ReportSeeder;
use Database\Seeders\ProgramSeeder;
use Database\Seeders\ProjectSeeder;
use Database\Seeders\DocumentSeeder;
use Database\Seeders\EmployeeSeeder;
use Database\Seeders\PositionSeeder;
use Database\Seeders\candidatesSeeder;
use Database\Seeders\DepartmentSeeder;
use Database\Seeders\EnrollmentSeeder;
use Database\Seeders\LeavePolicySeeder;
use Database\Seeders\ReviewCycleSeeder;
use Database\Seeders\OnboardingTaskSeeder;
use Database\Seeders\EmployeeOnboardingSeeder;
use Database\Seeders\PerformancesReviewSeeder;

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
            GoalSeeder::class,
            GoalProgressSeeder::class,
            
            DocumentSeeder::class,
            OnboardingTaskSeeder::class,
            candidatesSeeder::class,
            EmployeeOnboardingSeeder::class,
            OnboardingTaskSeeder::class,
            ProjectSeeder::class,
            TaskSeeder::class,
            FeedbackSeeder::class,
            ReportSeeder::class,
            
            
        ]);
    }
}
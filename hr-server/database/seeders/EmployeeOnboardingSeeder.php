<?php

namespace Database\Seeders;


use App\Models\Employee;
use App\Models\OnboardingTask;
use Illuminate\Database\Seeder;
use App\Models\EmployeeOnboarding;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EmployeeOnboardingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all();
        $tasks = OnboardingTask::all();

        foreach ($employees as $employee) {
            foreach ($tasks as $task) {
                $status = fake()->randomElement(['pending', 'in_progress', 'completed', 'rejected']);
                $completedDate = $status === 'completed' ? now()->subDays(rand(1, 30)) : null;

                EmployeeOnboarding::create([
                    'employee_id' => $employee->id,
                    'onboarding_task_id' => $task->id,
                    'status' => $status,
                    'completed_date' => $completedDate,
                ]);
            }
        }
    
    }
}

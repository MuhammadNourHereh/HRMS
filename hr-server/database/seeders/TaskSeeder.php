<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = Project::all();
        $employees = Employee::all();

        foreach ($projects as $project) {
            $taskCount = rand(3, 7);
            
            for ($i = 0; $i < $taskCount; $i++) {
                $status = fake()->randomElement(['pending', 'in_progress', 'completed']);
                $employeeId = $status !== 'pending' ? $employees->random()->id : null;
                
                Task::create([
                    'project_id' => $project->id,
                    'title' => 'Task ' . ($i + 1) . ' for ' . $project->title,
                    'description' => fake()->paragraph(),
                    'employee_id' => $employeeId,
                    'due_date' => now()->addDays(rand(7, 60)),
                    'status' => $status,
                ]);
            }
        }
    }
}

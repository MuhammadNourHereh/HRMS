<?php

namespace Database\Seeders;

use App\Models\GoalProgress;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class GoalProgressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $progresses = [
            // Progress updates for Layla's API Documentation goal (goal_id = 1)
            [
                'goal_id' => 1,
                'progress_note' => 'Started research on Swagger documentation best practices.',
                'progress_bar' => 10.00,
                'created_at' => Carbon::now()->subDays(30),
                'updated_at' => Carbon::now()->subDays(30),
            ],
            [
                'goal_id' => 1,
                'progress_note' => 'Completed initial setup of Swagger in the codebase. Created documentation for 5 endpoints so far.',
                'progress_bar' => 35.00,
                'created_at' => Carbon::now()->subDays(20),
                'updated_at' => Carbon::now()->subDays(20),
            ],
            [
                'goal_id' => 1,
                'progress_note' => 'Documented all user authentication endpoints. Working on employee management endpoints now.',
                'progress_bar' => 60.00,
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(10),
            ],
            
            // Progress updates for Omar's Communication goal (goal_id = 4)
            [
                'goal_id' => 4,
                'progress_note' => 'Had initial meetings with team leads to discuss communication pain points.',
                'progress_bar' => 25.00,
                'created_at' => Carbon::now()->subDays(60),
                'updated_at' => Carbon::now()->subDays(60),
            ],
            [
                'goal_id' => 4,
                'progress_note' => 'Established bi-weekly sync meetings between engineering and design teams.',
                'progress_bar' => 50.00,
                'created_at' => Carbon::now()->subDays(45),
                'updated_at' => Carbon::now()->subDays(45),
            ],
            [
                'goal_id' => 4,
                'progress_note' => 'Created documentation templates for feature specifications. Received positive feedback.',
                'progress_bar' => 75.00,
                'created_at' => Carbon::now()->subDays(30),
                'updated_at' => Carbon::now()->subDays(30),
            ],
            [
                'goal_id' => 4,
                'progress_note' => 'Completed implementation of communication protocol. All teams now using the new process.',
                'progress_bar' => 100.00,
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(15),
            ],
            
            // Progress updates for Omar's Architecture Design Skills goal (goal_id = 5)
            [
                'goal_id' => 5,
                'progress_note' => 'Started reading "Clean Architecture" book and taking notes.',
                'progress_bar' => 15.00,
                'created_at' => Carbon::now()->subDays(25),
                'updated_at' => Carbon::now()->subDays(25),
            ],
            [
                'goal_id' => 5,
                'progress_note' => 'Led first architecture discussion for the upcoming reporting feature.',
                'progress_bar' => 40.00,
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(15),
            ],
            
            // Progress updates for Nadia's Senior Role Preparation goal (goal_id = 6)
            [
                'goal_id' => 6,
                'progress_note' => 'Volunteered to lead the performance optimization project.',
                'progress_bar' => 20.00,
                'created_at' => Carbon::now()->subDays(45),
                'updated_at' => Carbon::now()->subDays(45),
            ],
            [
                'goal_id' => 6,
                'progress_note' => 'Started mentoring the new junior developer. Created onboarding materials.',
                'progress_bar' => 40.00,
                'created_at' => Carbon::now()->subDays(30),
                'updated_at' => Carbon::now()->subDays(30),
            ],
            [
                'goal_id' => 6,
                'progress_note' => 'Successfully led the performance optimization project. Page load times reduced by 40%.',
                'progress_bar' => 70.00,
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(10),
            ],
            
            // Progress updates for Sami's Employment Law goal (goal_id = 8)
            [
                'goal_id' => 8,
                'progress_note' => 'Enrolled in "Advanced Employment Regulations" online course.',
                'progress_bar' => 10.00,
                'created_at' => Carbon::now()->subDays(20),
                'updated_at' => Carbon::now()->subDays(20),
            ],
            [
                'goal_id' => 8,
                'progress_note' => 'Completed first 3 modules of the course with high scores on assessments.',
                'progress_bar' => 30.00,
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(10),
            ],
            
            // Progress updates for Maya's Talent Management goal (goal_id = 9)
            [
                'goal_id' => 9,
                'progress_note' => 'Researched best practices in talent management and succession planning.',
                'progress_bar' => 25.00,
                'created_at' => Carbon::now()->subDays(60),
                'updated_at' => Carbon::now()->subDays(60),
            ],
            [
                'goal_id' => 9,
                'progress_note' => 'Drafted initial succession planning framework document.',
                'progress_bar' => 50.00,
                'created_at' => Carbon::now()->subDays(45),
                'updated_at' => Carbon::now()->subDays(45),
            ],
            [
                'goal_id' => 9,
                'progress_note' => 'Presented framework to HR director. Received approval to implement.',
                'progress_bar' => 75.00,
                'created_at' => Carbon::now()->subDays(30),
                'updated_at' => Carbon::now()->subDays(30),
            ],
            [
                'goal_id' => 9,
                'progress_note' => 'Completed implementation of succession planning framework. Created development plans for 5 high-potential employees.',
                'progress_bar' => 100.00,
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(15),
            ],
        ];

        GoalProgress::insert($progresses);
    }
}
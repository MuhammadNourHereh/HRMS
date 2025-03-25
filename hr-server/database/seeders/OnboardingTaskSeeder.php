<?php

namespace Database\Seeders;

use App\Models\OnboardingTask;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class OnboardingTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            [
                'title' => 'Complete W-4 Tax Form',
                'description' => 'Fill out W-4 form for tax withholding purposes',
                'is_required' => true,
            ],
            [
                'title' => 'Sign Employee Handbook',
                'description' => 'Review and sign the employee handbook acknowledgment',
                'is_required' => true,
            ],
            [
                'title' => 'Setup Email Account',
                'description' => 'IT will create your company email account',
                'is_required' => true,
            ],
            [
                'title' => 'Office Tour',
                'description' => 'Tour of the office facilities and introduction to team members',
                'is_required' => false,
            ],
            [
                'title' => 'Training Session: Company Tools',
                'description' => 'Introduction to the tools and software used by the company',
                'is_required' => true,
            ],
        ];

        foreach ($tasks as $task) {
            OnboardingTask::create($task);
        }
    }
}

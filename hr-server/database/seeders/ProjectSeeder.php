<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Website Redesign',
                'description' => 'Complete overhaul of the company website with modern design and improved UX',
                'status' => 'in_progress',
            ],
            [
                'title' => 'Mobile App Development',
                'description' => 'Develop a mobile application for iOS and Android platforms',
                'status' => 'pending',
            ],
            [
                'title' => 'Database Migration',
                'description' => 'Migrate legacy database to new cloud-based system',
                'status' => 'completed',
            ],
            [
                'title' => 'Marketing Campaign Q2',
                'description' => 'Plan and execute Q2 marketing campaign across digital channels',
                'status' => 'in_progress',
            ],
            [
                'title' => 'HR System Implementation',
                'description' => 'Implement new HR management system for improved employee tracking',
                'status' => 'pending',
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}

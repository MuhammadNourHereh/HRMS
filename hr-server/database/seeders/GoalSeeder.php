<?php

namespace Database\Seeders;

use App\Models\Goal;
use Illuminate\Database\Seeder;

class GoalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $goals = [
            // Goals for Layla Haddad (employee_id = 2)
            [
                'employee_id' => 2, // Layla Haddad
                'review_cycle_id' => 5, // Q1 2025
                'title' => 'Improve API Documentation',
                'description' => 'Create comprehensive API documentation for our backend services using Swagger. Ensure all endpoints are properly documented with examples and response schemas.',
                'priority' => 'High',
                'status' => 'In Progress',
            ],
            [
                'employee_id' => 2, // Layla Haddad
                'review_cycle_id' => 7, // Mid-Year Development Plan
                'title' => 'Lead Code Review Process',
                'description' => 'Take ownership of establishing a more structured code review process for the development team. Create guidelines and templates for effective code reviews.',
                'priority' => 'Medium',
                'status' => 'Not Started',
            ],
            [
                'employee_id' => 2, // Layla Haddad
                'review_cycle_id' => 8, // Q3 2025
                'title' => 'Learn Kubernetes',
                'description' => 'Develop skills in container orchestration with Kubernetes. Complete certification course and implement a pilot project using Kubernetes for our development environment.',
                'priority' => 'Medium',
                'status' => 'Not Started',
            ],
            
            // Goals for Omar Gemayel (employee_id = 3)
            [
                'employee_id' => 3, // Omar Gemayel
                'review_cycle_id' => 5, // Q1 2025
                'title' => 'Improve Cross-Team Communication',
                'description' => 'Establish regular sync meetings with product and design teams. Create a communication protocol for technical requirements and implementation feedback.',
                'priority' => 'High',
                'status' => 'Completed',
            ],
            [
                'employee_id' => 3, // Omar Gemayel
                'review_cycle_id' => 7, // Mid-Year Development Plan
                'title' => 'Develop Architecture Design Skills',
                'description' => 'Take more initiative in architecture decisions. Lead the design for at least two new features, documenting approach and trade-offs.',
                'priority' => 'Medium',
                'status' => 'In Progress',
            ],
            
            // Goals for Nadia Saab (employee_id = 4)
            [
                'employee_id' => 4, // Nadia Saab
                'review_cycle_id' => 5, // Q1 2025
                'title' => 'Prepare for Senior Developer Role',
                'description' => 'Demonstrate leadership and mentoring capabilities. Lead at least one significant project and mentor at least one junior developer.',
                'priority' => 'High',
                'status' => 'In Progress',
            ],
            [
                'employee_id' => 4, // Nadia Saab
                'review_cycle_id' => 7, // Mid-Year Development Plan
                'title' => 'Improve Testing Framework',
                'description' => 'Research and implement improved automated testing strategies. Increase test coverage by 20% and reduce test execution time by 15%.',
                'priority' => 'Medium',
                'status' => 'Not Started',
            ],
            
            // Goals for HR team members
            [
                'employee_id' => 7, // Sami Rahme
                'review_cycle_id' => 6, // Q2 2025
                'title' => 'Expand Employment Law Knowledge',
                'description' => 'Complete advanced course in employment law regulations. Apply knowledge to review and update company HR policies.',
                'priority' => 'Medium',
                'status' => 'In Progress',
            ],
            [
                'employee_id' => 8, // Maya Aoun
                'review_cycle_id' => 6, // Q2 2025
                'title' => 'Develop Talent Management Skills',
                'description' => 'Research and propose a succession planning framework for the organization. Create development plans for high-potential employees.',
                'priority' => 'High',
                'status' => 'Completed',
            ],
            [
                'employee_id' => 9, // Fadi Ibrahim
                'review_cycle_id' => 6, // Q2 2025
                'title' => 'Improve Interview Skills',
                'description' => 'Develop confidence in conducting initial candidate screenings. Complete interview training course and conduct at least 10 initial screenings under supervision.',
                'priority' => 'Medium',
                'status' => 'Not Started',
            ],
        ];

        foreach ($goals as $goal) {
            Goal::create($goal);
        }
    }
}
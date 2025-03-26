<?php

namespace Database\Seeders;

use App\Models\Feedback;
use Illuminate\Database\Seeder;

class FeedbackSeeder extends Seeder
{
   
    public function run(): void
    {
        $feedbacks = [
            // Feedback for Q1 2025 (Review Cycle ID 5)
            [
                'employee_id' => 2, // Layla Haddad
                'review_cycle_id' => 5,
                'title' => 'Technical Documentation Improvement',
                'description' => 'Layla has shown remarkable improvement in her documentation practices. Her API documentation is now comprehensive and has become a reference for the team. She should continue to mentor others in this area.',
            ],
            [
                'employee_id' => 3, // Omar Gemayel
                'review_cycle_id' => 5,
                'title' => 'Communication with Product Team',
                'description' => 'Omar needs to improve communication with the product team. There have been instances where requirements were misunderstood, leading to implementation delays. Consider establishing more regular check-ins with product managers.',
            ],
            [
                'employee_id' => 4, // Nadia Saab
                'review_cycle_id' => 5,
                'title' => 'Leadership Potential',
                'description' => 'Nadia has demonstrated strong leadership qualities in the last quarter. She took initiative during a critical project phase and guided junior team members effectively. She is ready for more leadership responsibilities.',
            ],
            
            // Feedback for Q2 2025 (Review Cycle ID 6)
            [
                'employee_id' => 7, // Sami Rahme
                'review_cycle_id' => 6,
                'title' => 'Policy Knowledge Growth',
                'description' => 'Sami has made good progress in learning HR policies, but still needs to deepen his understanding of employment regulations. Recommend enrolling in additional training courses on employment law.',
            ],
            [
                'employee_id' => 8, // Maya Aoun
                'review_cycle_id' => 6,
                'title' => 'Onboarding Process Improvement',
                'description' => 'Maya has successfully improved the onboarding process. New hire satisfaction scores have increased by 25%. She should document her approach to ensure consistency across departments.',
            ],
            
            // Feedback for Q3 2025 (Review Cycle ID 8)
            [
                'employee_id' => 2, // Layla Haddad
                'review_cycle_id' => 8,
                'title' => 'Architecture Design Skills',
                'description' => 'Layla has excelled in architectural design this quarter. The new backend system she designed has significantly improved system performance. She should continue to develop her system design skills and mentor others.',
            ],
            [
                'employee_id' => 5, // Karim Abou Zeid
                'review_cycle_id' => 8,
                'title' => 'Testing Coverage',
                'description' => 'Karim needs to improve test coverage for his code. While his frontend work is impressive, we\'ve encountered bugs that could have been caught with better test coverage. Recommend pairing with QA team to develop better testing strategies.',
            ],
        ];

        foreach ($feedbacks as $feedback) {
            Feedback::create($feedback);
        }
    }
}
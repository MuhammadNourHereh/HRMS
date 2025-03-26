<?php

namespace Database\Seeders;

use App\Models\PerformancesReview;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PerformancesReviewSeeder extends Seeder
{
 
    public function run(): void
    {
        // Reset the auto-increment to start from 5
        DB::statement('ALTER TABLE performances_reviews AUTO_INCREMENT = 5');
        
        $performanceReviews = [
            // Q1 2025 Performance Reviews (Review Cycle ID 5)
            [
                'employee_id' => 2, // Layla Haddad
                'review_cycle_id' => 5,
                'overall_rating' => 4.2,
                'comments' => 'Layla has demonstrated excellent technical skills and initiative. She consistently delivers high-quality code and has improved team documentation practices. Areas for growth include taking more leadership in project planning and mentoring junior developers.',
            ],
            [
                'employee_id' => 3, // Omar Gemayel
                'review_cycle_id' => 5,
                'overall_rating' => 3.8,
                'comments' => 'Omar is a reliable team member who consistently meets deadlines and maintains good code quality. He has shown great progress in adopting new technologies. For continued growth, Omar should focus on improving communication with cross-functional teams and taking more initiative in architecture decisions.',
            ],
            [
                'employee_id' => 4, // Nadia Saab
                'review_cycle_id' => 5,
                'overall_rating' => 4.5,
                'comments' => 'Nadia has exceeded expectations in all assigned tasks. Her problem-solving abilities and attention to detail are exceptional. She has become a go-to resource for complex technical issues and has significantly improved our testing frameworks. Recommended for consideration for a senior role in the next review cycle.',
            ],
            
            [
                'employee_id' => 7, // Sami Rahme
                'review_cycle_id' => 6,
                'overall_rating' => 3.5,
                'comments' => 'Sami has shown steady progress in his role this quarter. He demonstrates good understanding of HR policies and effective communication with employees. Areas for improvement include deeper knowledge of employment regulations and taking more initiative in process improvement.',
            ],
            [
                'employee_id' => 8, // Maya Aoun
                'review_cycle_id' => 6,
                'overall_rating' => 4.0,
                'comments' => 'Maya continues to be an asset to the HR team. She has successfully implemented new employee onboarding procedures resulting in improved new hire satisfaction scores. Her organizational skills are excellent. To continue growing, Maya should expand her knowledge of talent development and succession planning.',
            ],
            [
                'employee_id' => 9, // Fadi Ibrahim
                'review_cycle_id' => 6,
                'overall_rating' => 3.2,
                'comments' => 'Fadi meets expectations in his core responsibilities. He is reliable in handling administrative tasks and employee inquiries. For the next review period, Fadi should focus on gaining more confidence in conducting initial interviews and contributing more proactively to department initiatives.',
            ],
            
            [
                'employee_id' => 2, // Layla Haddad
                'review_cycle_id' => 8,
                'overall_rating' => 4.4,
                'comments' => 'Layla continues to excel in her technical role. This quarter, she led the implementation of new backend architecture that improved system performance by 30%. She has also been more active in mentoring junior developers. Continue to develop project management and cross-team collaboration skills.',
            ],
            [
                'employee_id' => 5, // Karim Abou Zeid
                'review_cycle_id' => 8,
                'overall_rating' => 3.7,
                'comments' => 'Karim has made solid contributions to the team this quarter. His front-end development work has resulted in improved user experience and faster page load times. He collaborates well with the design team. Moving forward, Karim should focus on expanding his technical stack and improving code testing coverage.',
            ],
        ];

        foreach ($performanceReviews as $review) {
            PerformancesReview::create($review);
        }
    }
}
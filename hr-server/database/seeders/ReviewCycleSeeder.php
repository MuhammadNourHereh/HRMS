<?php

namespace Database\Seeders;

use App\Models\ReviewCycle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewCycleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       
        
        $reviewCycles = [
            [
                'provided_hr_id' => 1, // Ziad Khoury (HR)
                'cycle_name' => 'Q1 2025 Performance Review',
                'start_date' => '2025-01-01',
                'end_date' => '2025-03-31',
            ],
            [
                'provided_hr_id' => 6, // Rania Nassar (HR)
                'cycle_name' => 'Q2 2025 Performance Review',
                'start_date' => '2025-04-01',
                'end_date' => '2025-06-30',
            ],
            [
                'provided_hr_id' => 1, // Ziad Khoury (HR)
                'cycle_name' => 'Mid-Year 2025 Development Plan',
                'start_date' => '2025-07-01',
                'end_date' => '2025-07-31',
            ],
            [
                'provided_hr_id' => 6, // Rania Nassar (HR)
                'cycle_name' => 'Q3 2025 Performance Review',
                'start_date' => '2025-07-01',
                'end_date' => '2025-09-30',
            ],
            [
                'provided_hr_id' => 1, // Ziad Khoury (HR)
                'cycle_name' => 'Q4 2025 Performance Review',
                'start_date' => '2025-10-01',
                'end_date' => '2025-12-31',
            ],
            [
                'provided_hr_id' => 6, // Rania Nassar (HR)
                'cycle_name' => 'Year-End 2025 Development Plan',
                'start_date' => '2025-12-01',
                'end_date' => '2025-12-31',
            ],
        ];

        foreach ($reviewCycles as $reviewCycle) {
            ReviewCycle::create($reviewCycle);
        }
    }
}
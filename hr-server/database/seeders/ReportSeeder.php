<?php

namespace Database\Seeders;

use App\Models\Report;
use App\Models\Employee;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all();
        $documentTypes = ['tax', 'health', 'contract', 'certification', 'other'];
        $statuses = ['submitted', 'approved', 'rejected', 'pending'];

        foreach ($employees as $employee) {
            $reportCount = rand(1, 4);
            
            for ($i = 0; $i < $reportCount; $i++) {
                Report::create([
                    'title' => fake()->randomElement([
                        'Annual Performance Review',
                        'Medical Insurance Form',
                        'Tax Withholding Certificate',
                        'Professional Certification',
                        'Quarterly Review',
                        'Training Completion',
                    ]),
                    'document_type' => fake()->randomElement($documentTypes),
                    'status' => fake()->randomElement($statuses),
                    'emp_id' => $employee->id,
                ]);
            }
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('documents')->insert([
            [
                'employee_id' => 4,
                'file_type' => 'pdf',
                'file_url' => '/storage/employee_documents/4/employment_contract.pdf',
                'file_description' => 'Employment Contract',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 5,
                'file_type' => 'xlsx',
                'file_url' => '/storage/employee_documents/5/payroll.xlsx',
                'file_description' => 'Payroll Details',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 6,
                'file_type' => 'pdf',
                'file_url' => '/storage/employee_documents/6/company_policy.pdf',
                'file_description' => 'Company Policy',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 7,
                'file_type' => 'png',
                'file_url' => '/storage/employee_documents/7/id_card.png',
                'file_description' => 'Employee ID Card',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 8,
                'file_type' => 'jpg',
                'file_url' => '/storage/employee_documents/8/training_certificate.jpg',
                'file_description' => 'Training Certificate',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'employee_id' => 9,
                'file_type' => 'docx',
                'file_url' => '/storage/employee_documents/9/performance_report.docx',
                'file_description' => 'Performance Report',
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            
        ]);
    }
}